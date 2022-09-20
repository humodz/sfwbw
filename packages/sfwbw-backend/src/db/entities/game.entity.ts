import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { PlayerInGame } from './player-in-game.entity';
import { User } from './user.entity';

export enum GameStatus {
  OPEN = 'OPEN',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

@Entity()
export class Game {
  @Expose()
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Expose()
  @Unique()
  @Property({ type: String })
  name!: string;

  @Expose()
  @Property({ type: Boolean })
  isPrivate!: boolean;

  @Property({ type: String, nullable: true })
  password!: string | null;

  @Expose()
  @Enum(() => GameStatus)
  status!: GameStatus;

  @Expose()
  @Property({ type: 'json' })
  map!: any;

  @Expose()
  @Property({ type: 'int', nullable: true })
  maxTurns!: number | null;

  @Expose()
  @ManyToOne({ entity: () => User, inversedBy: 'ownedGames' })
  owner!: User;

  @OneToMany({ entity: () => PlayerInGame, mappedBy: 'game' })
  players = new Collection<PlayerInGame>(this);

  @Expose({ name: 'players' })
  getPlayers() {
    if (!this.players.isInitialized()) {
      return null;
    }

    return this.players.getItems().map((it) => ({
      // TODO per-user settings
      user: it.user,
    }));
  }
}
