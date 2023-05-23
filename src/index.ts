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
import { UserResolver } from './resolvers/UserResolver';
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis"

// TODO: CORS, entities relations.

const main = async () => {
  const PORT = process.env.PORT;

  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  await orm.getMigrator().up();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver]
    }),
  });

  await apolloServer.start();

  const app = express();

  // TODO: Refactor Redis, investigate flags.
  // Initialize client.
  let redisClient = createClient()
  redisClient.connect().catch(console.error)

  redisClient.on('connect', () => {
    console.log('Connected to Redis Server');
  });

  redisClient.on('error', (err) => {
    console.log('Error connecting to Redis Server', err);
  });

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "testing-blog:",
    disableTouch: true
  })

  app.use(
    session({
      name: "testing-session-cookie",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "keyboard cat",
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' // TODO: Investigate Redis CSRF
      }
    })
  )

  app.use('/graphql', json(), expressMiddleware(apolloServer, {
    context: async ({ req, res }) => (
      // TODO: Just to avoid CSRF errors and allow mutations. Set proper headers later.
      res.setHeader('x-apollo-operation-name', 'testing-csrf'),
      { em: orm.em.fork(), req, res }
    ),
  }),
  );

  app.listen(PORT, () => {
    console.log(`Express server running at port: ${PORT}`);
  });
};

main().catch(err => {
  console.error(err);
});

