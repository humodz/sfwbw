import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/db/entities';
import * as Scrypt from 'scrypt-kdf';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
  passwordVersion: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      return null;
    }

    const buffer = Buffer.from(user.passwordHash, 'base64');
    const passwordIsCorrect = await Scrypt.verify(buffer, password);

    if (!passwordIsCorrect) {
      return null;
    }

    return user;
  }

  async createToken(user: User) {
    const payload: TokenPayload = {
      passwordVersion: user.passwordVersion,
      username: user.username,
    };

    return await this.jwtService.signAsync(payload);
  }

  async hashPassword(password: string): Promise<string> {
    const params = {
      logN: 15,
      r: 8,
      p: 1,
    };

    return (await Scrypt.kdf(password, params)).toString('base64');
  }
}
