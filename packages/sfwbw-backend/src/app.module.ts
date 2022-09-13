import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { DatabaseModule, EntitiesModule } from './db';
import { UserModule } from './user';

@Module({
  imports: [DatabaseModule, EntitiesModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
