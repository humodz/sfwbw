import { Action, ActionType, Game } from '../../types';
import { executeActionRecruit } from './recruit';

export function executeAction(game: Game, action: Action): Game {
  const handlers: ActionRecord = {
    [ActionType.RECRUIT]: executeActionRecruit,
    [ActionType.RANGED_ATTACK]: (game) => game,
    [ActionType.MOVE]: (game) => game,
  };

  const handler = handlers[action.type] as ActionHandler;
  return handler(game, action);
}

type ActionHandler<T extends Action = Action> = (game: Game, action: T) => Game;

type ActionRecord = {
  [Key in ActionType]: ActionHandler<Extract<Action, { type: Key }>>;
};
