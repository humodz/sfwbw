import { produce } from 'immer';
import { Game, GameSettings } from '../types';
import { Terrain, Tile } from '../types/tiles';
import { PredeployedUnit } from '../types/units';
import { isEnum, sorted, unique } from '../utils';
import { unitData } from './data/units';
import { canBeResupplied } from './factory';
import { calculateRepair, calculateResupplyCost, createUnit } from './unit';

export const PLAYER_NEUTRAL = 0;

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

  const settings: GameSettings = {
    fundsPerProperty: 1000,
    totalHealth: 100,
    repairAmount: 20,
    unitLimit: 50,
  };

  return {
    settings,
    tiles: correctedTiles,
    units: units.map((it) => createUnit(settings, it.type, it.player, it.pos)),
    history: [],
    currentPlayerIndex: 0,
    players: playerIds.map((id) => ({ id, funds: 0, defeated: false })),
    rng: 'TODO',
  };
}

export function nextTurn(game: Game): Game {
  return produce(game, (game) => {
    const isFirstTurn = game.history.length === 0;

    if (!isFirstTurn) {
      game.currentPlayerIndex =
        (game.currentPlayerIndex + 1) % game.players.length;
    }

    game.history.push({
      playerIndex: game.currentPlayerIndex,
      actions: [],
    });

    const myself = game.players[game.currentPlayerIndex];

    const properties = game.tiles
      .flat()
      .filter((tile) => tile.player === myself.id);

    const income = game.settings.fundsPerProperty * properties.length;
    myself.funds += income;

    for (const unit of game.units) {
      if (unit.player === myself.id) {
        unit.moved = false;
        const tile = game.tiles[unit.pos.y][unit.pos.x];

        // TODO - what happens if the player does not have enough funds?
        if (tile.player === myself.id && canBeResupplied(unit, tile)) {
          const { repair, repairCost } = calculateRepair(game.settings, unit);
          const resupplyCost = calculateResupplyCost(unit);

          myself.funds -= repairCost + resupplyCost;

          unit.health += repair;
          unit.ammo = unitData[unit.type].ammo;
          unit.fuel = unitData[unit.type].fuel;
        }
      }
    }

    myself.funds = Math.max(0, myself.funds);
  });
}
