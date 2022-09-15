import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Controller, Post } from '@nestjs/common';
import { Protected } from 'src/auth';
import { Game } from 'src/db/entities';

@Controller('/games')
export class GameController {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
  ) {}

  @Post()
  @Protected()
  async createGame() {
    return {};
  }
}
