import { GamePlayer, Tile, TileType, Unit, UnitType } from '../types';
import { isOneOf } from '../utils';
import { unitData, UnitFactory } from './data/units';

const factoryData = {
  [TileType.HQ]: getUnitList(UnitFactory.BASE_OR_HQ),
  [TileType.BASE]: getUnitList(UnitFactory.BASE_OR_HQ),
  [TileType.AIRPORT]: getUnitList(UnitFactory.AIRPORT),
  [TileType.PORT]: getUnitList(UnitFactory.PORT),
  [TileType.STATION]: getUnitList(UnitFactory.STATION),
};

function getUnitList(factory: UnitFactory) {
  return Object.entries(unitData)
    .filter(([, data]) => data.factory === factory)
    .map(([type]) => type as UnitType);
}

type FactoryTile = keyof typeof factoryData;

export function isFactory(tile: TileType): tile is FactoryTile {
  return tile in factoryData;
}

export function getFactoryUnits(tile: FactoryTile) {
  return factoryData[tile];
}

export function getAvailableUnits(player: GamePlayer, tile: FactoryTile) {
  return factoryData[tile].filter(
    (unitType) => player.funds >= unitData[unitType].cost,
  );
}

// TODO - validate this in the game
const resupplyData = {
  [UnitFactory.BASE_OR_HQ]: [TileType.HQ, TileType.BASE, TileType.CITY],
  [UnitFactory.LAB]: [TileType.HQ, TileType.BASE, TileType.CITY],
  [UnitFactory.AIRPORT]: [TileType.AIRPORT],
  [UnitFactory.PORT]: [TileType.PORT],
  [UnitFactory.STATION]: [TileType.STATION],
};

export function canBeResupplied(unit: Unit, tile: Tile) {
  const factory = unitData[unit.type].factory;
  return isOneOf(tile.type, resupplyData[factory]);
}
