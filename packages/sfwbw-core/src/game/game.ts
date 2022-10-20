import { Game } from 'src';
import { Action, Coord } from '../types/action';
import { Terrain, Tile } from '../types/tiles';
import { PredeployedUnit } from '../types/units';
import { countUnique, isEnum, repeat } from '../utils';

export const PLAYER_NEUTRAL = 0;

export function createGame(
  tiles: Tile[][],
  units: Array<[Coord, PredeployedUnit]>,
): Game {
  const correctedTiles = tiles.map((row) =>
    row.map((tile) => {
      if (isEnum(Terrain, tile.type)) {
        return { ...tile, player: PLAYER_NEUTRAL };
      } else {
        return tile;
      }
    }),
  );

  const playerCount = countUnique(
    correctedTiles
      .flat()
      .map((tile) => tile.player)
      .filter((player) => player !== PLAYER_NEUTRAL),
  );

  return {
    tiles: correctedTiles,
    units: units.map(([coord, predeployedUnit]) => {
      const unit = {
        ...predeployedUnit,
        health: 10,
        fuel: 0,
        ammo: 0,
        experience: 0,
        captureProgress: 0,
        loaded: [],
      };

      return [coord, unit];
    }),
    history: [],
    currentPlayer: 0,
    players: repeat(playerCount, { funds: 0, defeated: false }),
    rng: 'TODO',
  };
}

export function executeAction(game: Game, action: Action): Game {
  return game;
}
