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
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Expose()
  @Unique()
  @Property({ type: String })
  username!: string;

  @Property({ type: String })
  passwordHash!: string;

  @Property({ type: 'int' })
  passwordVersion!: number;

  @Expose()
  @Unique()
  @Property({ type: String, nullable: true })
  email: string | null = null;

  @Property()
  role!: 'player' | 'admin';

  @OneToMany({ entity: () => Game, mappedBy: 'owner' })
  ownedGames = new Collection<Game>(this);

  @OneToMany({ entity: () => PlayerInGame, mappedBy: 'user' })
  games = new Collection<Game>(this);
}
