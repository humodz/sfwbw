import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from './db';

@Module({
  imports: [databaseModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
