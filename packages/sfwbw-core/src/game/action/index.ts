import { Action, ActionType, Game } from '../../types';
import { executeActionRecruit } from './recruit';

export function executeAction(game: Game, action: Action): Game {
  const handlers: Record<ActionType, ActionHandler> = {
    [ActionType.RECRUIT]: executeActionRecruit,
    [ActionType.RANGED_ATTACK]: (game) => game,
    [ActionType.MOVE]: (game) => game,
    [ActionType.IDLE]: (game) => game,
  };

  return handlers[action.type](game, action);
}

type ActionHandler = (game: Game, action: Action) => Game;
