import { GamePlayer, TileType, UnitType } from 'src/types';
import { unitData, UnitFactory } from './data/units';

export const factoryData = {
  [TileType.HQ]: getUnitList(UnitFactory.BASE_OR_HQ),
  [TileType.BASE]: getUnitList(UnitFactory.BASE_OR_HQ),
  [TileType.AIRPORT]: getUnitList(UnitFactory.AIRPORT),
  [TileType.PORT]: getUnitList(UnitFactory.PORT),
  [TileType.STATION]: getUnitList(UnitFactory.STATION),
};

type FactoryTile = keyof typeof factoryData;

function getUnitList(factory: UnitFactory) {
  return Object.entries(unitData)
    .filter(([, data]) => data.factory === factory)
    .map(([type]) => type as UnitType);
}

export function isFactory(tile: TileType): tile is FactoryTile {
  return tile in factoryData;
}

export function getAvailableUnits(player: GamePlayer, tile: FactoryTile) {
  return factoryData[tile].filter(
    (unitType) => player.funds >= unitData[unitType].cost,
  );
}
