import { serializeTiles, Tile, PredeployedUnit } from '@sfwbw/sfwbw-core';
import { serializeUnits } from './models';

export interface SearchMapsRequest {
  search?: string;
  author?: string;
}

export interface CreateMapRequest {
  name: string;
  tiles: Tile[][];
  units: Record<string, PredeployedUnit>;
}

export interface UpdateMapRequest {
  id: number;
  data: CreateMapRequest;
}

export function serializeDesignMap(data: CreateMapRequest) {
  return {
    ...data,
    tiles: serializeTiles(data.tiles),
    units: serializeUnits(data.units),
  };
}
