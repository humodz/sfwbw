import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { User } from './user.entity';

export enum GameStatus {
  OPEN = 'OPEN',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

@Entity()
export class Game {
  @Expose()
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  isPrivate!: boolean;

  @Property({ type: String, nullable: true })
  password!: string | null;

  @Expose()
  @Enum(() => GameStatus)
  status!: GameStatus;

  @Expose()
  @Property({ type: 'json' })
  map!: string;

  @Expose()
  @Property({ type: 'int' })
  maxTurns!: number | null;

  @ManyToMany({ entity: () => User, inversedBy: 'games' })
  players = new Collection<User>(this);
}
