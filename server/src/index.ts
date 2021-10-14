import { ApolloServer } from "apollo-server-express";
import DataLaoder from "dataloader";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import "reflect-metadata";
// import { PubSub } from "graphql-subscriptions";
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
    if (token) {
      try {
        const { user } = jwt.verify(
          token,
          process.env.SECRET1 || ""
        ) as JWTTokenPayload;
        res.header(
          "Access-Control-Expose-Headers",
          "x-token, x-refresh-token"
        );

        res.header("x-token", token);
        res.header("x-refresh-token", refreshToken);
        return user;
      } catch (error) {
        const refreshToken =
          (req.headers["x-refresh-token"] as string) || "";

        const newTokens = await new User().refreshTokens(
          refreshToken,
          process.env.SECRET1 || "",
          process.env.SECRET2 || ""
        );

        if (!newTokens) return undefined;

        if (newTokens.token && newTokens.refreshToken) {
          res.header(
            "Access-Control-Expose-Headers",
            "x-token, x-refresh-token"
          );

          res.header("x-token", newTokens.token);
          res.header("x-refresh-token", newTokens.refreshToken);
        }
        return newTokens.user;
      }
    }
    return undefined;
  };

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "production"
  );
  await createConnection({
    ...options,
    name: "default",
    namingStrategy: new SnakeNamingStrategy(),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        TeamResolver,
        ChannelResolver,
        MessageResolver,
      ],
      validate: true,
    }),
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
        schema: await buildSchema({
          resolvers: [
            UserResolver,
            TeamResolver,
            ChannelResolver,
            MessageResolver,
          ],
          validate: true,
        }),
      },
      {
        server,
        path: "/subscriptions",
      }
    );
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
