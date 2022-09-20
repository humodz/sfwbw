import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GameStatus } from 'src/db/entities/game.entity';
import { PlayerInGame } from 'src/db/entities/player-in-game.entity';
import { LoggedUser, Protected } from '../auth';
import { Game, User } from '../db/entities';
import { CreateGameRequest } from './dto/create-game.request';
import { UpdateGameRequest } from './dto/update-game.request';

@Controller('/games')
export class GameController {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
    @InjectRepository(PlayerInGame)
    private readonly playerInGameRepository: EntityRepository<PlayerInGame>,
  ) {}

  @Post()
  @Protected()
  async createGame(
    @LoggedUser() user: User,
    @Body() newGame: CreateGameRequest,
  ) {
    const game = this.gameRepository.create({
      name: newGame.name,
      isPrivate: newGame.isPrivate,
      password: newGame.password,
      maxTurns: newGame.maxTurns,
      map: newGame.map,
      status: GameStatus.OPEN,
      owner: user,
    });

    const playerInGame = this.playerInGameRepository.create({
      user,
      game,
    });

    this.gameRepository.persist(game);
    this.playerInGameRepository.persist(playerInGame);
    await this.gameRepository.flush();

    return game;
  }

  @Get(':id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return await this.gameRepository.findOneOrFail(
      { id },
      { populate: ['owner', 'players'] },
    );
  }

  @Get()
  async listGames() {
    const games = await this.gameRepository.findAll({
      populate: ['owner', 'players'],
    });

    return { games };
  }

  @Protected()
  @Delete(':id')
  async deleteGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: ['owner'] },
    );

    if (loggedUser.role !== 'admin' && loggedUser.id !== game.owner.id) {
      throw new ForbiddenException();
    }

    await this.gameRepository.removeAndFlush(game);
  }

  @Protected()
  @Put(':id')
  async updateGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: UpdateGameRequest,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: ['owner'] },
    );

    if (loggedUser.role !== 'admin' && loggedUser.id !== game.owner.id) {
      throw new ForbiddenException();
    }

    if (game.status !== GameStatus.OPEN) {
      throw new BadRequestException('Game is not open');
    }

    console.log(updates);

    return game;
  }
}
