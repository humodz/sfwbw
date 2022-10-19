import { serializeTiles, Tile, Unit } from '@sfwbw/sfwbw-core';

export interface SearchMapsRequest {
  search?: string;
  author?: string;
}

export interface CreateMapRequest {
  name: string;
  tiles: Tile[][];
  units: Record<string, Unit>;
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

export function serializeUnits(
  units: Record<string, Unit>,
): Array<{ key: [number, number]; value: Unit }> {
  return Object.entries(units).map(([coord, unit]) => ({
    key: coord.split(',').map(Number) as [number, number],
    value: unit,
  }));
}
