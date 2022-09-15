import { Global, Injectable, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { env } from './env';

@Injectable()
export class DatabaseConfig {
  connectionUri = env('APP_DB_CONNECTIONURI');
  password = env('APP_DB_PASSWORD');
}

@Injectable()
export class AuthConfig {
  secret = env('APP_AUTH_SECRET');
  expiresIn = env('APP_AUTH_EXPIRESIN', { defaultsTo: '30 days' });
}

const exportedProviders = [DatabaseConfig, AuthConfig];

@Global()
@Module({
  providers: exportedProviders,
  exports: exportedProviders,
})
export class ConfigModule {
  constructor() {
    dotenv.config();
  }
}
