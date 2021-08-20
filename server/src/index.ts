import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ChannelResolver } from "./resolvers/ChannelResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { TeamResolver } from "./resolvers/TeamResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { config } from "dotenv";

config();

export interface Context {
  req: any;
  res: any;
  user: { id: number };
  jwtSecret1: string;
  jwtSecret2: string;
}
(async () => {
  const app = express();

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
    context: ({ req, res }): Context => ({
      req,
      res,
      user: { id: 1 },
      jwtSecret1: process.env.SECRET1 || "supersecret",
      jwtSecret2: process.env.SECRET2 || "supersecret",
    }),
  });

  const corsOptions = {
    origin: "*",
    credentials: false,
  };

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
