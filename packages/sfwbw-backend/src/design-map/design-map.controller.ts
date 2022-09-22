import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LoggedUser, Protected } from 'src/auth';
import { DesignMap, User } from 'src/db/entities';
import { UserRole } from 'src/db/entities/user.entity';
import { countUnique } from 'src/utils/array';
import { CreateDesignMapRequest } from './dto/create-design-map.request';

@Controller('/design-maps')
export class DesignMapController {
  constructor(
    @InjectRepository(DesignMap)
    private readonly designMapRepository: EntityRepository<DesignMap>,
  ) {}

  @Get()
  async listMaps() {
    return await this.designMapRepository.findAll({
      populate: ['author'],
    });
  }

  @Get(':id')
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
    const maxPlayers = countUnique(
      body.tiles.flat().map((tile) => tile.player),
    );

    const designMap = this.designMapRepository.create({
      name: body.name,
      author: user,
      maxPlayers,
      rows: body.tiles.length,
      columns: body.tiles[0].length,
      tiles: body.tiles,
    });

    await this.designMapRepository.persistAndFlush(designMap);

    return designMap;
  }

  @Put(':id')
  async updateMap() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMap(@LoggedUser() user: User, @Param('id') id: number) {
    const designMap = await this.designMapRepository.findOneOrFail(
      { id },
      { populate: ['author'] },
    );

    if (user.role !== UserRole.ADMIN && user.id !== designMap.author.id) {
      throw new ForbiddenException();
    }

    await this.designMapRepository.removeAndFlush(designMap);
  }
}
