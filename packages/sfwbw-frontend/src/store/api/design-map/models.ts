import {
  deserializeTiles,
  Tile,
  PredeployedUnit,
  pointFromString,
  pointToString,
} from '@sfwbw/sfwbw-core';
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

export function deserializeDesignMap(rawDesignMap: RawDesignMap): DesignMap {
  return {
    ...rawDesignMap,
    tiles: deserializeTiles(rawDesignMap.tiles),
    units: deserializeUnits(rawDesignMap.units),
  };
}

function deserializeUnits(
  unitsRaw: SerializedUnits,
): Record<string, PredeployedUnit> {
  const result: any = {};

  for (const entry of unitsRaw) {
    const point = { x: entry.key[0], y: entry.key[1] };
    const unit = entry.value;
    result[pointToString(point)] = unit;
  }

  return result;
}

export function serializeUnits(
  units: Record<string, PredeployedUnit>,
): SerializedUnits {
  return Object.entries(units).map(([pointRaw, unit]) => {
    const point = pointFromString(pointRaw);

    return {
      key: [point.x, point.y],
      value: unit,
    };
  });
}
