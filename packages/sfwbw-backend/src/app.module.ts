import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { ConfigModule } from './config';
import { DatabaseModule, EntitiesModule } from './db';
import { DesignMapModule } from './design-map';
import { GameModule } from './game';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    EntitiesModule,
    UserModule,
    AuthModule,
    GameModule,
    DesignMapModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
