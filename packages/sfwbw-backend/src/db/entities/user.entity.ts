import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { Game } from './game.entity';
@Entity()
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

  @ManyToMany({ entity: () => Game, mappedBy: 'players' })
  games = new Collection<Game>(this);
}
