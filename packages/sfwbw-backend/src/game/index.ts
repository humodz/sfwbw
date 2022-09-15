import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { EntitiesModule } from '../db';

@Module({
  imports: [EntitiesModule, AuthModule],
})
export class GameModule {}
