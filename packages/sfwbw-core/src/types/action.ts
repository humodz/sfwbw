import { UnitType } from './units';

export type Coord = [number, number];

export type Action =
  | ActionRecruit
  | ActionRangedAttack
  | ActionMove
  | ActionIdle;

export enum ActionType {
  RECRUIT = 'RECRUIT',
  RANGED_ATTACK = 'RANGED_ATTACK',
  MOVE = 'MOVE',
  IDLE = 'IDLE',
}

export interface ActionRecruit {
  type: ActionType.RECRUIT;
  where: Coord;
  unit: UnitType;
}

export interface ActionRangedAttack {
  type: ActionType.RANGED_ATTACK;
  where: Coord;
  target: Coord;
}

export interface ActionMove {
  type: ActionType.MOVE;
  from: Coord;
  to: Coord;
  subAction: SubAction | null;
}

export interface ActionIdle {
  type: ActionType.IDLE;
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
  type: SubActionType.CAPTURE | SubActionType.LOAD | SubActionType.UNLOAD;
}

export interface SubActionAttack {
  type: SubActionType.ATTACK;
  target: Coord;
}

export interface SubActionUnload {
  type: SubActionType.ATTACK;
  where: Coord;
  unitIndex: number;
}
