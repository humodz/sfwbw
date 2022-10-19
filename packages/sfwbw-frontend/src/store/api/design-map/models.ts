import { deserializeTiles, Tile, PredeployedUnit } from '@sfwbw/sfwbw-core';
import { User } from '../user';

export interface DesignMap {
  id: number;
  author: User;
  name: string;
  maxPlayers: number;
  rows: number;
  columns: number;
  tiles: Tile[][];
  units: Record<string, PredeployedUnit>;
}

export interface RawDesignMap extends Omit<DesignMap, 'tiles' | 'units'> {
  tiles: string;
  units: SerializedUnits;
}

type SerializedUnits = Array<{ key: [number, number]; value: PredeployedUnit }>;

export function deserializeDesignMap(rawDesignMap: RawDesignMap) {
  return {
    ...rawDesignMap,
    tiles: deserializeTiles(rawDesignMap.tiles),
    units: deserializeUnits(rawDesignMap.units),
  };
}

function deserializeUnits(unitsRaw: SerializedUnits): Record<string, PredeployedUnit> {
  const result: any = {};

  for (const entry of unitsRaw) {
    const coord = entry.key.join(',');
    const unit = entry.value;
    result[coord] = unit;
  }

  return result;
}

export function serializeUnits(units: Record<string, PredeployedUnit>): SerializedUnits {
  return Object.entries(units).map(([coord, unit]) => ({
    key: coord.split(',').map(Number) as [number, number],
    value: unit,
  }));
}
