import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { databaseModule, entitiesModule } from './db';
import { UserController } from './user/user.controller';

@Module({
  imports: [databaseModule(), entitiesModule()],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}
