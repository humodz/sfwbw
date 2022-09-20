import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseConfig } from '../config';
import * as entities from './entities';
import { NotFoundFilter } from './filters/not-found.filter';
import { UniqueConstraintFilter } from './filters/unique-constraint.filter';

const allEntities = Object.values(entities);

export const EntitiesModule = MikroOrmModule.forFeature(allEntities);

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [DatabaseConfig],
      useFactory: (dbConfig: DatabaseConfig) => ({
        type: 'postgresql',
        schema: 'public',
        clientUrl: dbConfig.connectionUri,
        password: dbConfig.password,
        entities: allEntities,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: UniqueConstraintFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class DatabaseModule {}
