import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { EntitiesModule } from 'src/db';

@Module({
  imports: [EntitiesModule, AuthModule],
})
export class GameModule {}
