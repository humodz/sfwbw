import { Point } from './point';
import { UnitType } from './units';

export type Action = ActionRecruit | ActionRangedAttack | ActionMove;

export enum ActionType {
  RECRUIT = 'RECRUIT',
  RANGED_ATTACK = 'RANGED_ATTACK',
  MOVE = 'MOVE',
}

export interface ActionRecruit {
  type: ActionType.RECRUIT;
  where: Point;
  unit: UnitType;
}

export interface ActionRangedAttack {
  type: ActionType.RANGED_ATTACK;
  where: Point;
  target: Point;
}

export interface ActionMove {
  type: ActionType.MOVE;
  where: Point;
  path: Point[];
  subAction: SubAction | null;
}

export type SubAction = SubActionSimple | SubActionAttack | SubActionUnload;

export enum SubActionType {
  CAPTURE = 'CAPTURE',
  ATTACK = 'ATTACK',
  LOAD = 'LOAD',
  UNLOAD = 'UNLOAD',
  SUPPLY = 'SUPPLY',
}

export interface SubActionSimple {
  type: SubActionType.CAPTURE | SubActionType.LOAD;
}

export interface SubActionAttack {
  type: SubActionType.ATTACK;
  target: Point;
}

export interface SubActionUnload {
  type: SubActionType.ATTACK;
  where: Point;
  unitIndex: number;
}
