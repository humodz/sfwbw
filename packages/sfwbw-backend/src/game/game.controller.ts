import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameStatus } from 'src/db/entities/game.entity';
import { PlayerInGame } from 'src/db/entities/player-in-game.entity';
import { LoggedUser, Protected } from '../auth';
import { Game, User } from '../db/entities';
import { CreateGameRequest } from './dto/create-game.request';

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

  @Get()
  async listGames() {
    const games = await this.gameRepository.findAll({
      populate: ['owner', 'players'],
    });

    return { games };
  }
}
