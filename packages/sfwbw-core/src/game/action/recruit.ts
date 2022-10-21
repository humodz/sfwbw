import produce from 'immer';
import { ActionRecruit, Game } from '../../types';
import { unitData } from '../data/units';
import { getAvailableUnits, isFactory } from '../factory';
import { createUnit, InvalidAction, isCurrentPlayer, isVacant } from './etc';

// TODO - unit limit
export function executeActionRecruit(game: Game, action: ActionRecruit) {
  return produce(game, (game) => {
    const player = game.players[game.currentPlayerIndex];
    const tile = game.tiles[action.where.y][action.where.x];

    if (
      !isCurrentPlayer(game, tile.player) ||
      !isVacant(game, action.where) ||
      !isFactory(tile.type) ||
      !getAvailableUnits(player, tile.type).includes(action.unit)
    ) {
      throw new InvalidAction();
    }

    game.units.push(createUnit(action.unit, player.id, action.where));
    player.funds -= unitData[action.unit].cost;
  });
}
