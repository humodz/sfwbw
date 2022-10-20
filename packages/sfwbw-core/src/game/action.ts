import { Game, Action } from '../types';

export function executeAction(game: Game, action: Action): Game {
  console.log(action);
  return game;
}
