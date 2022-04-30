import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWTTokenPayload, User, RefreshTokensResponse } from '../entity/User';

/**
 * Generates new authentication tokens
 * @param {string} refreshToken
 * @param {string} secret1
 * @param {string} secret2
 * @returns pair of new authentication tokens
 */
export async function refreshTokens(
  refreshToken: string,
  secret1: string,
  secret2: string
): Promise<RefreshTokensResponse | null> {
  let userId = 0;
  try {
    const { user } = jwt.decode(refreshToken) as JWTTokenPayload;
    userId = user.id;
  } catch (error) {
    return null;
  }
  const user = await User.findOne(userId);

  if (!user) {
    return null;
  }

  const refreshSecret = user.password + secret2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (error) {
    return null;
  }

  const [newToken, newRefreshToken] = user.createTokens(secret1, refreshSecret);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    },
  };
}

/**
 * Checks if tokens are valid and if they are but token is expired, regenerates them
 * @param {string} token
 * @param {string} refreshToken
 * @param {string} res
 * @returns {User | underfined} user info
 */
export async function checkToken(
  token: string,
  refreshToken: string,
  res?: Response
): Promise<{ id: number; username: string; isAdmin: boolean } | undefined> {
  if (token) {
    try {
      const { user } = jwt.verify(
        token,
        process.env.SECRET1 || ''
      ) as JWTTokenPayload;
      if (res) {
        res.header('Access-Control-Expose-Headers', 'x-token, x-refresh-token');

        res.header('x-token', token);
        res.header('x-refresh-token', refreshToken);
      }
      return user;
    } catch (error) {
      const newTokens = await refreshTokens(
        refreshToken,
        process.env.SECRET1 || '',
        process.env.SECRET2 || ''
      );

      if (!newTokens) return undefined;

      if (newTokens.token && newTokens.refreshToken) {
        if (res) {
          res.header(
            'Access-Control-Expose-Headers',
            'x-token, x-refresh-token'
          );

          res.header('x-token', newTokens.token);
          res.header('x-refresh-token', newTokens.refreshToken);
        }
      }
      return newTokens.user;
    }
  }
  return undefined;
}

/**
 * Extracts the user info from header tokens and returns it. Creates new tkens and put them in response header.
 * @param {Request} req express request
 * @param {Response} res express response
 * @returns user info
 */
export async function extractTokens(
  req: Request<unknown>,
  res: Response<unknown>
) {
  const token = req.headers['x-token'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;
  return checkToken(token, refreshToken, res);
}
