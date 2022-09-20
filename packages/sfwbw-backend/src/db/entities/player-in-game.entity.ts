import { Entity, ManyToOne, PrimaryKeyType } from '@mikro-orm/core';
import { Game } from './game.entity';
import { User } from './user.entity';

@Entity()
export class PlayerInGame {
  [PrimaryKeyType]?: [number, number];

  @ManyToOne({ entity: () => Game, inversedBy: 'players', primary: true })
  game!: Game;

  @ManyToOne({ entity: () => User, inversedBy: 'games', primary: true })
  user!: User;
}
