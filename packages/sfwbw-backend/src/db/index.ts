import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as entities from './entities';

const allEntities = Object.values(entities);

export function databaseModule() {
  return MikroOrmModule.forRoot({
    type: 'postgresql',
    dbName: 'postgres',
    schema: 'public',
    user: 'postgres',
    password: 'example',
    entities: allEntities,
  });
}

export function entitiesModule() {
  return MikroOrmModule.forFeature(allEntities);
}
