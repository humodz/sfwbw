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
  Query,
} from '@nestjs/common';
import { Nation } from '@sfwbw/sfwbw-core';
import { LoggedUser, Protected } from '../auth';
import { DesignMap, User } from '../db/entities';
import { UserRole } from '../db/entities/user.entity';
import { countUnique } from '../utils/array';
import { CreateDesignMapRequest } from './dto/create-design-map.request';

@Controller('/design-maps')
export class DesignMapController {
  constructor(
    @InjectRepository(DesignMap)
    private readonly designMapRepository: EntityRepository<DesignMap>,
  ) {}

  @Get()
  async listMaps(@Query('search') rawSearchTerm = '') {
    const searchTerm = rawSearchTerm.replace(/[_%]/g, '\\$1');

    const where = rawSearchTerm
      ? {
          name: {
            $ilike: `%${searchTerm}%`,
          },
        }
      : {};

    return await this.designMapRepository.find(where, {
      populate: ['author'],
    });
  }

  @Get('@:id')
  async getMapById(@Param('id', ParseIntPipe) id: number) {
    return await this.designMapRepository.findOneOrFail(
      { id },
      { populate: ['author'] },
    );
  }

  @Protected()
  @Post()
  async createMap(
    @LoggedUser() user: User,
    @Body() body: CreateDesignMapRequest,
  ) {
    const props = this.calculateProperties(body);

    const designMap = this.designMapRepository.create({
      name: body.name,
      author: user,
      ...props,
    });

    await this.designMapRepository.persistAndFlush(designMap);

    return designMap;
  }

  @Protected()
  @Put('@:id')
  async updateMap(
    @LoggedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateDesignMapRequest,
  ) {
    const designMap = await this.findOneAndValidateUser(user, id);
    const props = this.calculateProperties(body);

    designMap.name = body.name;
    Object.assign(designMap, props);

    await this.designMapRepository.persistAndFlush(designMap);

    return designMap;
  }

  @Protected()
  @Delete('@:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMap(
    @LoggedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const designMap = await this.findOneAndValidateUser(user, id);

    await this.designMapRepository.removeAndFlush(designMap);
  }

  async findOneAndValidateUser(user: User, id: number) {
    const designMap = await this.designMapRepository.findOneOrFail(
      { id },
      { populate: ['author'] },
    );

    if (user.role !== UserRole.ADMIN && user.id !== designMap.author.id) {
      throw new ForbiddenException();
    }

    return designMap;
  }

  calculateProperties(body: CreateDesignMapRequest) {
    const mapMaxPlayers =
      countUnique(body.map.flat().map((tile) => tile.player)) - 1;

    const maxPlayers = Object.values(Nation).length - 1;

    if (mapMaxPlayers <= 0 || mapMaxPlayers > maxPlayers) {
      throw new BadRequestException(
        'A design map must have from 1 to 4 players',
      );
    }

    return {
      maxPlayers: mapMaxPlayers,
      rows: body.map.length,
      columns: body.map[0].length,
      tiles: body.map,
    };
  }
}
