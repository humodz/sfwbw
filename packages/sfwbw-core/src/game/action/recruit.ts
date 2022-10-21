import produce from 'immer';
import { ActionRecruit, Game } from '../../types';
import { unitData } from '../data/units';
import { getAvailableUnits, isFactory } from '../factory';
import { createUnit, isVacant } from '../unit';
import { InvalidAction, isCurrentPlayer } from './etc';

// TODO - check unit limit
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

    const unit = createUnit(
      game.settings,
      action.unit,
      player.id,
      action.where,
    );
    game.units.push(unit);
    player.funds -= unitData[action.unit].cost;
  });
}
