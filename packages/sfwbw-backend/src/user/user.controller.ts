import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../db/entities';
import { CreateUserDto } from './create-user.dto';
import * as Scrypt from 'scrypt-kdf';

@Controller('/users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      username: userDto.username,
      passwordHash: await this.hashPassword(userDto.password),
      email: userDto.email,
    });

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  @Get()
  async list(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  @Get('@:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ username });
    return user;
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
