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
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Nation } from '@sfwbw/sfwbw-core';
import { LoggedUser, Protected } from '../auth';
import { DesignMap, Game, User } from '../db/entities';
import { GameStatus } from '../db/entities/game.entity';
import { PlayerInGame } from '../db/entities/player-in-game.entity';
import { UserRole } from '../db/entities/user.entity';
import { first } from '@sfwbw/sfwbw-core';
import { isDefined } from '../utils';
import { CreateGameRequest } from './dto/create-game.request';
import { UpdateGameRequest } from './dto/update-game.request';
import { UpdatePlayerRequest } from './dto/update-player.request';

const gameFieldsToPopulate = [
  'owner',
  'players',
  'players.user',
  'designMap',
] as const;

@Controller('/games')
export class GameController {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
    @InjectRepository(PlayerInGame)
    private readonly playerInGameRepository: EntityRepository<PlayerInGame>,
    @InjectRepository(DesignMap)
    private readonly designMapRepository: EntityRepository<DesignMap>,
  ) {}

  @Post()
  @Protected()
  async createGame(@LoggedUser() user: User, @Body() body: CreateGameRequest) {
    const designMap = await this.designMapRepository.findOneOrFail({
      id: body.designMapId,
    });

    const game = this.gameRepository.create({
      name: body.name,
      designMap,
      password: body.password,
      status: GameStatus.OPEN,
      owner: user,
    });

    const playerInGame = this.playerInGameRepository.create({
      user,
      game,
      order: 1,
      nation: Nation.RED_STAR,
    });

    this.gameRepository.persist(game);
    this.playerInGameRepository.persist(playerInGame);
    await this.gameRepository.flush();

    return game;
  }

  @Get('@:id')
  async getGameById(@Param('id', ParseIntPipe) id: number) {
    return await this.gameRepository.findOneOrFail(
      { id },
      { populate: gameFieldsToPopulate },
    );
  }

  @Get()
  async listGames(@Query('search') rawSearchTerm = '') {
    const searchTerm = rawSearchTerm.replace(/[_%]/g, '\\$1');

    const where = rawSearchTerm
      ? {
          name: {
            $ilike: `%${searchTerm}%`,
          },
        }
      : {};

    const games = await this.gameRepository.find(where, {
      populate: gameFieldsToPopulate,
    });

    return games;
  }

  @Protected()
  @Delete('@:id')
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

    if (game.status !== GameStatus.OPEN) {
      throw new BadRequestException('Game is not open');
    }

    await this.gameRepository.removeAndFlush(game);
  }

  @Protected()
  @Put('@:id')
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

    if (updates.password !== undefined) {
      game.password = updates.password;
    }

    if (isDefined(updates.designMapId)) {
      const designMap = await this.designMapRepository.findOneOrFail({
        id: updates.designMapId,
      });

      const players = await game.getPlayers();
      const playersInExcess = players.slice(designMap.maxPlayers);

      for (const player of playersInExcess) {
        this.playerInGameRepository.remove(player);
      }

      game.designMap = designMap;
    }

    await this.gameRepository.flush();

    return game;
  }

  @Protected()
  @Post('@:id/players/self')
  async joinGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
    @Query('password') password?: string,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: [...gameFieldsToPopulate] },
    );

    if (game.status !== GameStatus.OPEN) {
      throw new BadRequestException('Game is not open');
    }

    if (isDefined(game.password) && game.password !== password) {
      throw new ForbiddenException('Wrong password');
    }

    const players = await game.getPlayers();

    if (players.length === game.designMap.maxPlayers) {
      throw new BadRequestException('Game is full');
    }

    if (players.some((player) => player.user.id === loggedUser.id)) {
      return game;
    }

    const order = 1 + Math.max(0, ...players.map((player) => player.order));
    const nation = await this.getFirstAvailableNation(game);

    if (!nation) {
      throw new InternalServerErrorException(`No nations available`);
    }

    const playerInGame = this.playerInGameRepository.create({
      game,
      user: loggedUser,
      order,
      nation,
    });

    await this.playerInGameRepository.persistAndFlush(playerInGame);

    return game;
  }

  @Protected()
  @Put('@:id/players/self')
  async updatePlayer(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: UpdatePlayerRequest,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: gameFieldsToPopulate },
    );

    if (game.status !== GameStatus.OPEN) {
      throw new BadRequestException('Game is not open');
    }

    const players = await game.getPlayers();

    const existingPlayerInGame = players.find(
      (player) => player.user.username === loggedUser.username,
    );

    if (!existingPlayerInGame) {
      throw new BadRequestException('You are not in this game');
    }

    if (isDefined(updates.ready)) {
      existingPlayerInGame.ready = updates.ready;
    }

    if (
      isDefined(updates.nation) &&
      updates.nation !== existingPlayerInGame.nation
    ) {
      const availableNations = await game.availableNations();

      if (!availableNations.includes(updates.nation)) {
        throw new BadRequestException('Nation not available');
      }

      existingPlayerInGame.nation = updates.nation;
    }

    await this.startGameIfEveryoneReady(game);

    await this.playerInGameRepository.persistAndFlush(existingPlayerInGame);

    return game;
  }

  @Protected()
  @Delete('@:id/players/self')
  async leaveGame(
    @LoggedUser() loggedUser: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const game = await this.gameRepository.findOneOrFail(
      { id },
      { populate: gameFieldsToPopulate },
    );

    const playerInGame = await this.playerInGameRepository.findOne({
      game,
      user: loggedUser,
    });

    if (!playerInGame) {
      return;
    }

    this.playerInGameRepository.remove(playerInGame);

    const players = await game.getPlayers();

    if (players.length === 0) {
      this.gameRepository.remove(game);
    } else if (game.owner.id === loggedUser.id) {
      game.owner = players[0].user;
    }

    await this.startGameIfEveryoneReady(game);
    await this.gameRepository.flush();

    if (players.length === 0) {
      return undefined;
    }
    return game;
  }

  async getFirstAvailableNation(game: Game) {
    const nations = await game.availableNations();
    const nation = first(nations);

    if (!nation) {
      throw new InternalServerErrorException(`No nations available`);
    }

    return nation;
  }

  async startGameIfEveryoneReady(game: Game) {
    const players = await game.getPlayers();

    if (players.every((player) => player.ready)) {
      game.status = GameStatus.IN_PROGRESS;
    }
  }
}
