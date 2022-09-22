import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { EntitiesModule } from '../db';
import { DesignMapController } from './design-map.controller';

@Module({
  imports: [AuthModule, EntitiesModule],
  controllers: [DesignMapController],
})
export class DesignMapModule {}
