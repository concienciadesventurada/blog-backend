import 'dotenv/config'
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import config from './mikro-orm.config';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';

// TODO: ApolloMiddleware, context and CORS.

const main = async () => {
  const PORT = process.env.PORT;

  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(apolloServer, { listen: { port: 4000 } });

  const app = express();

  console.log('Apollo server running' + url);

  app.listen(PORT, () => {
    console.log(`Express server running at port: ${PORT}`);
  });

};

main().catch(err => {
  console.error(err);
});

