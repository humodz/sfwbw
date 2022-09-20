import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { Game } from './game.entity';
import { PlayerInGame } from './player-in-game.entity';
@Entity({ tableName: 'app_user' })
export class User {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  @Expose()
  username!: string;

  @Property()
  passwordHash!: string;

  @Property({ type: Number })
  passwordVersion!: number;

  @Unique()
  @Property({ type: String, nullable: true })
  @Expose()
  email: string | null = null;

  @Property()
  role!: 'player' | 'admin';

  @OneToMany({ entity: () => Game, mappedBy: 'owner' })
  ownedGames = new Collection<Game>(this);

  @OneToMany({ entity: () => PlayerInGame, mappedBy: 'user' })
  games = new Collection<Game>(this);
}
