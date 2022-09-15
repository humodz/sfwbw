import {
  createParamDecorator,
  ExecutionContext,
  Module,
  UseGuards,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from 'src/config';
import { EntitiesModule } from '../db';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EntitiesModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [AuthConfig],
      useFactory: (authConfig: AuthConfig) => ({
        secret: authConfig.secret,
        signOptions: {
          expiresIn: authConfig.expiresIn,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

export const LoggedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const Protected = () => UseGuards(JwtGuard);
