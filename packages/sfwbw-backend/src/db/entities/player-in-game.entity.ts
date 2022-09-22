import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Nation } from '@sfwbw/sfwbw-core';
import { Game } from './game.entity';
import { User } from './user.entity';

@Entity()
export class PlayerInGame {
  [PrimaryKeyType]?: [number, number];
  [OptionalProps]?: 'ready';

  @ManyToOne({ entity: () => Game, inversedBy: 'players', primary: true })
  game!: Game;

  @ManyToOne({
    entity: () => User,
    inversedBy: 'games',
    primary: true,
    onDelete: 'cascade',
  })
  user!: User;

  @Property({ type: Boolean, default: false })
  ready = false;

  @Property({ type: 'int' })
  order!: number;

  @Property({ type: String })
  nation!: Nation;
}
