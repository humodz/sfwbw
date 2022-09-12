import * as entities from './entities';

const allEntities = Object.values(entities);

export default {
  type: 'postgresql',
  dbName: 'postgres',
  schema: 'public',
  user: 'postgres',
  password: 'example',
  entities: allEntities,
};
