import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { TeamResolver } from "./resolvers/TeamResolver";
import { ChannelResolver } from "./resolvers/ChannelResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export interface Context {
  req: any;
  res: any;
  user: { id: number };
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
      resolvers: [UserResolver, TeamResolver, ChannelResolver, MessageResolver],
      validate: true,
    }),
    context: ({ req, res }): Context => ({ req, res, user: { id: 1 } }),
  });

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  apolloServer.applyMiddleware({ app, cors: corsOptions });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
