import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../db/entities';
import { CreateUserRequest } from './dto/create-user.request';
import { AuthService } from '../auth/auth.service';
import { LoggedUser, Protected } from '../auth';
import { UpdateUserRequest } from './dto/update-user.request';
import { UserRole } from 'src/db/entities/user.entity';

@Controller('/users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() newUser: CreateUserRequest): Promise<User> {
    const user = this.userRepository.create({
      username: newUser.username,
      passwordHash: await this.authService.hashPassword(newUser.password),
      passwordVersion: 1,
      email: newUser.email || null,
      role: UserRole.PLAYER,
    });

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  @Get()
  async list(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  @Protected()
  @Get('self')
  async getCurrentUser(@LoggedUser() user: User) {
    return user;
  }

  @Get('@:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ username });
    return user;
  }

  @Protected()
  @Put('self')
  async updateSelf(
    @LoggedUser() loggedUser: User,
    @Body() updates: UpdateUserRequest,
  ) {
    return await this.updateUser(loggedUser, loggedUser.username, updates);
  }

  @Protected()
  @Put('@:username')
  async updateUser(
    @LoggedUser() loggedUser: User,
    @Param('username') username: string,
    @Body() updates: UpdateUserRequest,
  ) {
    if (
      loggedUser.role !== UserRole.ADMIN &&
      loggedUser.username !== username
    ) {
      throw new ForbiddenException();
    }

    if (updates.email !== undefined) {
      loggedUser.email = updates.email;
    }

    if (updates.password) {
      loggedUser.passwordHash = await this.authService.hashPassword(
        updates.password,
      );
      loggedUser.passwordVersion += 1;
    }

    await this.userRepository.persistAndFlush(loggedUser);

    return loggedUser;
  }
}
