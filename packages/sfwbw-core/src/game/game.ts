import { produce } from 'immer';
import { Game } from '../types';
import { Terrain, Tile, TileType } from '../types/tiles';
import { PredeployedUnit, Unit } from '../types/units';
import { isEnum, isOneOf, sorted, unique } from '../utils';
import { unitData, UnitFactory } from './data/units';

export const PLAYER_NEUTRAL = 0;

const constants = {
  totalHealth: 100,
  repairAmount: 20,
};

export function createGame(tiles: Tile[][], units: PredeployedUnit[]): Game {
  const correctedTiles = tiles.map((row) =>
    row.map((tile) => {
      if (isEnum(Terrain, tile.type)) {
        return { ...tile, player: PLAYER_NEUTRAL };
      } else {
        return tile;
      }
    }),
  );

  const playerIds = sorted(
    unique(
      correctedTiles
        .flat()
        .map((tile) => tile.player)
        .filter((player) => player !== PLAYER_NEUTRAL),
    ),
  );

  return {
    settings: {
      fundsPerProperty: 1000,
    },
    tiles: correctedTiles,
    units: units.map((predeployedUnit) => {
      const data = unitData[predeployedUnit.type];

      const unit = {
        ...predeployedUnit,
        moved: false,
        health: constants.totalHealth,
        fuel: data.fuel,
        ammo: data.ammo,
        experience: 0,
        captureProgress: 0,
        loaded: [],
      };

      return unit;
    }),
    history: [],
    currentPlayerIndex: 0,
    players: playerIds.map((id) => ({ id, funds: 0, defeated: false })),
    rng: 'TODO',
  };
}

export function startTurn(game: Game): Game {
  return produce(game, (game) => {
    // TODO - unwait player units
    if (game.history.length > 0) {
      game.currentPlayerIndex =
        (game.currentPlayerIndex + 1) % game.players.length;
    }

    const myself = game.players[game.currentPlayerIndex];

    const properties = game.tiles
      .flat()
      .filter((tile) => tile.player === myself.id);

    const income = game.settings.fundsPerProperty * properties.length;
    myself.funds += income;

    for (const unit of game.units) {
      if (unit.player === myself.id) {
        const tile = game.tiles[unit.pos.y][unit.pos.x];

        // TODO - what happens if the player does not have enough funds?
        if (tile.player === myself.id && canBeResupplied(unit, tile)) {
          const { repair, repairCost } = calculateRepair(unit);

          unit.health += repair;
          myself.funds -= repairCost;

          // TODO - subtract funds
          unit.ammo = unitData[unit.type].ammo;
          unit.fuel = unitData[unit.type].fuel;
        }
      }
    }

    myself.funds = Math.max(0, myself.funds);
  });
}

// TODO - validate this
// TODO - move this somewhere?
const tileTypes = {
  [UnitFactory.BASE_OR_HQ]: [TileType.HQ, TileType.BASE, TileType.CITY],
  [UnitFactory.LAB]: [TileType.HQ, TileType.BASE, TileType.CITY],
  [UnitFactory.AIRPORT]: [TileType.AIRPORT],
  [UnitFactory.PORT]: [TileType.PORT],
  [UnitFactory.STATION]: [TileType.STATION],
};

function canBeResupplied(unit: Unit, tile: Tile) {
  const factory = unitData[unit.type].factory;
  return isOneOf(tile.type, tileTypes[factory]);
}

function calculateRepair(unit: Unit) {
  const repair = Math.min(
    constants.repairAmount,
    constants.totalHealth - unit.health,
  );

  const repairCost = Math.floor((unitData[unit.type].cost * repair) / 100);

  return { repair, repairCost };
}
