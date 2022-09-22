import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('/maps')
export class DesignMapController {
  @Get()
  async listMaps() {
    return null;
  }
  @Get(':id')
  async getMapById() {
    return null;
  }
  @Post()
  async createMap() {
    return null;
  }
  @Put(':id')
  async updateMap() {
    return null;
  }

  @Delete(':id')
  async deleteMap() {
    return null;
  }
}
