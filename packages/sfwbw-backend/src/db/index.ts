import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as entities from './entities';
import { UniqueConstraintFilter } from './filters/unique-constraint.filter';

const allEntities = Object.values(entities);

export const EntitiesModule = MikroOrmModule.forFeature(allEntities);

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      dbName: 'postgres',
      schema: 'public',
      user: 'postgres',
      password: 'example',
      entities: allEntities,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: UniqueConstraintFilter,
    },
  ],
})
export class DatabaseModule {}
