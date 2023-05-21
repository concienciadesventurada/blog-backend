import 'dotenv/config'
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ApolloServer } from '@apollo/server';
import { PostResolver } from './resolvers/PostResolver';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import config from './mikro-orm.config';
import express from 'express';

// TODO: CORS, entities relations.
// NOTE: Got ridden of `startStandaloneServer`, investigate why, thanks to
// GC on Discord for helping me out.

const main = async () => {
  const PORT = process.env.PORT;

  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver]
    }),
  });

  const app = express();

  app.listen(PORT, () => {
    console.log(`Express server running at port: ${PORT}`);
  });

  app.use('/graphql', json(), expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ em: orm.em.fork(), req, res }),
  }));

};

main().catch(err => {
  console.error(err);
});

