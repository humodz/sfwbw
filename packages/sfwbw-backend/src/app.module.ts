import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule, EntitiesModule } from './db';
import { UserController } from './user/user.controller';

@Module({
  imports: [DatabaseModule, EntitiesModule],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}
