import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { EntitiesModule } from 'src/db';
import { UserController } from './user.controller';

@Module({
  imports: [EntitiesModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}
