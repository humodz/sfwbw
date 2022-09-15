import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as entities from './entities';

const allEntities = Object.values(entities);

// Used by the mikro-orm cli
const config: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  schema: 'public',
  clientUrl: 'postgresql://postgres@127.0.0.1:5432/postgres',
  password: 'example',
  entities: allEntities,
};

export default config;
