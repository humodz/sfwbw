import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../db/entities';
import { CreateUserRequest } from './dto/create-user.request';
import { AuthService } from 'src/auth/auth.service';
import { LoggedUser, Protected } from 'src/auth';

@Controller('/users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() userDto: CreateUserRequest): Promise<User> {
    const user = this.userRepository.create({
      username: userDto.username,
      passwordHash: await this.authService.hashPassword(userDto.password),
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

  @Protected()
  @Get('self')
  async getCurrentUser(@LoggedUser() user: User) {
    return user;
  }
}
