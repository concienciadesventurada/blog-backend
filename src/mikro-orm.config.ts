import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Options } from '@mikro-orm/core';
import path from 'path';

//TODO: Make use of credentials and proper database name, user and password.

const config: Options<PostgreSqlDriver> = {
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}'
  },
  entities: ['./dist/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  type: 'postgresql',
  dbName: 'test',
  user: 'admin',
  password: 'admin',
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true
}

export default config;

