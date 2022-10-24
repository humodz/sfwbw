import produce from 'immer';
import {
  ActionMove,
  Game,
  Point,
  pointAdd,
  pointEquals,
  pointFromString,
  pointToString,
  Unit,
} from '../../types';
import { movementCost, unitData } from '../data';
import { getMapDimensions, InvalidAction, isCurrentPlayer } from '../etc';

export function executeActionMove(game: Game, action: ActionMove): Game {
  return produce(game, (game) => {
    const unit = game.units.find((unit) => pointEquals(unit.pos, action.where));

    if (!unit || !isCurrentPlayer(game, unit.player) || unit.fuel === 0) {
      throw new InvalidAction();
    }
  });
}

export function calculateValidMoves(game: Game, unit: Unit) {
  const moveCosts = movementCost[unitData[unit.type].movementType];
  const totalMoves = unitData[unit.type].move;

  const visited = new Set<string>();
  const pending: Move[] = [{ pos: unit.pos, remainingMoves: totalMoves }];

  while (pending.length > 0) {
    const move = popFirst(pending);
    const coord = pointToString(move.pos);

    if (visited.has(coord)) {
      continue;
    }

    visited.add(coord);

    if (move.remainingMoves === 0) {
      continue;
    }

    const neighbors = getNeighbors(move.pos, getMapDimensions(game.tiles));

    for (const neighbor of neighbors) {
      const tile = game.tiles[neighbor.y][neighbor.x];
      const tileMoveCost = moveCosts[tile.type];

      if (tileMoveCost === undefined) {
        // unit can't move here
        continue;
      }

      const remainingMoves = move.remainingMoves - tileMoveCost;

      if (remainingMoves < 0) {
        continue;
      }

      const newMove = {
        pos: neighbor,
        remainingMoves: remainingMoves,
      };

      insertBefore(
        pending,
        newMove,
        (other) => other.remainingMoves < newMove.remainingMoves,
      );
    }
  }

  return Array.from(visited, (coord) => pointFromString(coord));
}

// TODO - fuel costs
interface Move {
  pos: Point;
  remainingMoves: number;
}

function popFirst<T>(items: T[]): T {
  const item = items.shift();

  if (item === undefined) {
    throw new TypeError('Empty array');
  }

  return item;
}

function insertBefore<T>(items: T[], item: T, beforeItem: (other: T) => any) {
  const index = items.findIndex(beforeItem);

  if (index === -1) {
    items.push(item);
  } else {
    items.splice(index, 0, item);
  }
}

function getNeighbors(pos: Point, size: Point): Point[] {
  const deltas = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];

  return deltas
    .map((d) => pointAdd(pos, d))
    .filter((it) => it.x >= 0 && it.x < size.x && it.y >= 0 && it.y < size.y);
}
