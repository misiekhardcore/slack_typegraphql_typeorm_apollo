import {
  ApolloServer,
  AuthenticationError,
} from "apollo-server-express";
import DataLaoder from "dataloader";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Channel } from "./entity/Channel";
import { Team } from "./entity/Team";
import { JWTTokenPayload, User } from "./entity/User";
import { createChannelUsersLoader } from "./loaders/channelUsersLoader";
import { createMemberTeamsLoader } from "./loaders/memberTeamsLoader";
import { createTeamMembersLoader } from "./loaders/teamMembersLoader";
import { createUserChannelsLoader } from "./loaders/userChannelsLoader";
import { ChannelResolver } from "./resolvers/ChannelResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { TeamResolver } from "./resolvers/TeamResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { UserService } from "./services/user.service";

config();

export interface Context {
  req: any;
  res: any;
  userChannelsLoader: DataLaoder<number, Channel[], number>;
  channelUsersLoader: DataLaoder<number, User[], number>;
  memberTeamsLoader: DataLaoder<number, Team[], number>;
  teamMembersLoader: DataLaoder<number, User[], number>;
  user: { id: number } | null;
  jwtSecret1: string;
  jwtSecret2: string;
}
(async () => {
  const app = express();

  const checkToken = async (
    token: string,
    refreshToken: string,
    res?: Response
  ): Promise<
    { id: number; username: string; isAdmin: boolean } | undefined
  > => {
    if (token) {
      try {
        const { user } = jwt.verify(
          token,
          process.env.SECRET1 || ""
        ) as JWTTokenPayload;
        if (res) {
          res.header(
            "Access-Control-Expose-Headers",
            "x-token, x-refresh-token"
          );

          res.header("x-token", token);
          res.header("x-refresh-token", refreshToken);
        }
        return user;
      } catch (error) {
        const newTokens = await new User().refreshTokens(
          refreshToken,
          process.env.SECRET1 || "",
          process.env.SECRET2 || ""
        );

        if (!newTokens) return undefined;

        if (newTokens.token && newTokens.refreshToken) {
          if (res) {
            res.header(
              "Access-Control-Expose-Headers",
              "x-token, x-refresh-token"
            );

            res.header("x-token", newTokens.token);
            res.header("x-refresh-token", newTokens.refreshToken);
          }
        }
        return newTokens.user;
      }
    }
    return undefined;
  };

  /**
   * Extracts the user info from header tokens and returns it. Creates new tkens and put them in response header.
   * @param {Request} req express request
   * @param {Response} res express response
   * @returns user info
   */
  const extractTokens = async (
    req: Request<any>,
    res: Response<any>
  ) => {
    const token = req.headers["x-token"] as string;
    const refreshToken = req.headers["x-refresh-token"] as string;
    return await checkToken(token, refreshToken, res);
  };

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "production"
  );
  await createConnection({
    ...options,
    name: "default",
    namingStrategy: new SnakeNamingStrategy(),
  });

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TeamResolver,
      ChannelResolver,
      MessageResolver,
    ],
    validate: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({
      req,
      res,
    }: {
      res: Response;
      req: Request;
    }): Promise<Context> => {
      return {
        req,
        res,
        userChannelsLoader: createUserChannelsLoader(),
        channelUsersLoader: createChannelUsersLoader(),
        teamMembersLoader: createTeamMembersLoader(),
        memberTeamsLoader: createMemberTeamsLoader(),
        user: (await extractTokens(req, res)) || null,
        jwtSecret1: process.env.SECRET1 || "",
        jwtSecret2: process.env.SECRET2 || "",
      };
    },
  });

  const corsOptions = {
    origin: "*",
    credentials: false,
  };

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions });
  const port = process.env.PORT || 4000;

  const server = createServer(app);

  server.listen(port, async () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async (
          {
            token,
            refreshToken,
          }: { token: string; refreshToken: string },
          _webSocket: WebSocket
        ) => {
          const user = await checkToken(token, refreshToken);
          if (!user) throw new AuthenticationError("invalid tokens");

          const userService = new UserService();
          await userService.getMember(1, user.id);

          return true;
        },
      },
      {
        server,
      }
    );
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
