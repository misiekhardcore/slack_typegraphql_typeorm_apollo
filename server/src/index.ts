import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import DataLaoder from 'dataloader';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import { execute, subscribe } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { createServer } from 'http';
import 'reflect-metadata';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';
import { Channel } from './entity/Channel';
import { Team } from './entity/Team';
import { User } from './entity/User';
import { createChannelUsersLoader } from './loaders/channelUsersLoader';
import { createMemberTeamsLoader } from './loaders/memberTeamsLoader';
import { createTeamMembersLoader } from './loaders/teamMembersLoader';
import { createUserChannelsLoader } from './loaders/userChannelsLoader';
import { ChannelResolver } from './resolvers/ChannelResolver';
import { MessageResolver } from './resolvers/MessageResolver';
import { TeamResolver } from './resolvers/TeamResolver';
import { UserResolver } from './resolvers/UserResolver';
import { checkToken, extractTokens } from './utils/token';
import { createTeamChannelsLoader } from './loaders/teamChannelsLoader';
import { Message } from './entity/Message';
import { createChannelMessagesLoader } from './loaders/channelMessages';

config();

export interface Context {
  req: Request;
  res: Response;
  userChannelsLoader: DataLaoder<number, Channel[], number>;
  channelUsersLoader: DataLaoder<number, User[], number>;
  memberTeamsLoader: DataLaoder<number, Team[], number>;
  teamMembersLoader: DataLaoder<number, User[], number>;
  teamChannelsLoader: (userId: number) => DataLaoder<number, Channel[], number>;
  channelMessagesLoader: DataLaoder<number, Message[], number>;
  user: { id: number } | null;
  jwtSecret1: string;
  jwtSecret2: string;
}
(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.TEST_DB ? 'development' : 'production'
  );
  await createConnection({
    ...options,
    name: 'default',
    namingStrategy: new SnakeNamingStrategy(),
  });

  const redisOptions: RedisOptions = {
    host: process.env.REDIS_DOMAIN || '',
    port: +(process.env.REDIS_PORT || 0),
    retryStrategy: () => 3000,
  };

  const pubSub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions),
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, TeamResolver, ChannelResolver, MessageResolver],
    validate: true,
    pubSub,
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
        teamChannelsLoader: createTeamChannelsLoader(),
        channelMessagesLoader: createChannelMessagesLoader(),
        user: (await extractTokens(req, res)) || null,
        jwtSecret1: process.env.SECRET1 || '',
        jwtSecret2: process.env.SECRET2 || '',
      };
    },
  });

  app.use('/files', express.static('files'));

  app.use(graphqlUploadExpress({ maxFieldSize: 100000000, maxFiles: 10 }));

  const corsOptions = {
    origin: '*',
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
        onConnect: async ({
          token,
          refreshToken,
        }: {
          token: string;
          refreshToken: string;
        }) => {
          const user = await checkToken(token, refreshToken);
          if (!user) throw new AuthenticationError('invalid tokens');

          return { user };
        },
      },
      {
        server,
      }
    );
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
