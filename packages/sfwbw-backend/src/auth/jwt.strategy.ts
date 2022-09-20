import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../db/entities';
import { EntityRepository } from '@mikro-orm/core';
import { TokenPayload } from './auth.service';
import { AuthConfig } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    authConfig: AuthConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userRepository.findOne({
      username: payload.username,
    });

    if (!user || user.passwordVersion !== payload.passwordVersion) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
