import { Tile } from '@sfwbw/sfwbw-core';

export interface SearchMapsRequest {
  search?: string;
  author?: string;
}

export interface CreateMapRequest {
  name: string;
  tiles: Tile[][];
}

export interface UpdateMapRequest {
  id: number;
  data: CreateMapRequest;
}
