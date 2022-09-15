import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { EntitiesModule } from '../db';
import { UserController } from './user.controller';

@Module({
  imports: [EntitiesModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
