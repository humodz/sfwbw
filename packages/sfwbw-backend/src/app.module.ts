import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { AppController } from './app.controller';
import { NoContentInterceptor } from './app/no-content.interceptor';
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
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        validationError: { target: false },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory(reflector: any) {
        return new ClassSerializerInterceptor(reflector, {
          excludeExtraneousValues: true,
        });
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NoContentInterceptor,
    },
  ],
})
export class AppModule {}
