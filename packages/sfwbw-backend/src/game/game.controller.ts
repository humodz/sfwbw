import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GameStatus } from '../db/entities/game.entity';
import { PlayerInGame } from '../db/entities/player-in-game.entity';
import { UserRole } from '../db/entities/user.entity';
import { LoggedUser, Protected } from '../auth';
import { Game, User } from '../db/entities';
import { CreateGameRequest } from './dto/create-game.request';
import { UpdateGameRequest } from './dto/update-game.request';
import { isDefined } from '../utils/validation';
import { UdpatePlayerRequest as UpdatePlayerRequest } from './dto/update-player.request';

const gameFieldsToPopulate = ['owner', 'players', 'players.user'] as const;

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
      { populate: gameFieldsToPopulate },
    );
  }

  @Get()
  async listGames() {
    const games = await this.gameRepository.findAll({
      populate: gameFieldsToPopulate,
    });

    return { games };
  }

  @Protected()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: ['owner'] },
    );

    if (loggedUser.role !== UserRole.ADMIN && loggedUser.id !== game.owner.id) {
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
      { populate: gameFieldsToPopulate },
    );

    if (loggedUser.role !== UserRole.ADMIN && loggedUser.id !== game.owner.id) {
      throw new ForbiddenException();
    }

    if (game.status !== GameStatus.OPEN) {
      throw new BadRequestException('Game is not open');
    }

    if (updates.name) {
      game.name = updates.name;
    }

    await this.gameRepository.flush();

    return game;
  }

  @Protected()
  @Post(':id/players/self')
  async joinGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: gameFieldsToPopulate },
    );

    const existingPlayerInGame = await this.playerInGameRepository.findOne({
      game,
      user: loggedUser,
    });

    if (!existingPlayerInGame) {
      const playerInGame = this.playerInGameRepository.create({
        game,
        user: loggedUser,
      });

      await this.playerInGameRepository.persistAndFlush(playerInGame);
    }

    return game;
  }

  @Protected()
  @Put(':id/players/self')
  async updatePlayer(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePlayerRequest,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: gameFieldsToPopulate },
    );

    const existingPlayerInGame = await this.playerInGameRepository.findOne({
      game,
      user: loggedUser,
    });

    if (!existingPlayerInGame) {
      throw new BadRequestException({
        message: 'You are not in this game',
      });
    }

    existingPlayerInGame.ready = body.ready;

    await this.playerInGameRepository.persistAndFlush(existingPlayerInGame);

    return game;
  }

  @Protected()
  @Delete(':id/players/self')
  @HttpCode(HttpStatus.NO_CONTENT)
  async leaveGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: ['owner', 'players'] },
    );

    const playerInGame = await this.playerInGameRepository.findOne({
      game,
      user: loggedUser,
    });

    if (!playerInGame) {
      return;
    }

    this.playerInGameRepository.remove(playerInGame);

    if (game.players.length === 0) {
      this.gameRepository.remove(game);
    } else if (game.owner.id === loggedUser.id) {
      game.owner = game.players.getItems()[0].user;
    }

    await this.gameRepository.flush();
  }
}
