import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { EntitiesModule } from '../db';
import { GameController } from './game.controller';

@Module({
  imports: [EntitiesModule, AuthModule],
  controllers: [GameController],
})
export class GameModule {}
