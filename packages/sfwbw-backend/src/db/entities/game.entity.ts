import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Nation } from '@sfwbw/sfwbw-core';
import { Expose } from 'class-transformer';
import { DesignMap } from './design-map.entity';
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
  @PrimaryKey()
  id!: number;

  @Expose()
  @Property({ type: String })
  name!: string;

  @Expose()
  @Enum(() => GameStatus)
  status!: GameStatus;

  @Expose()
  @ManyToOne({ entity: () => DesignMap })
  designMap!: DesignMap;

  @Expose()
  @ManyToOne({ entity: () => User, inversedBy: 'ownedGames' })
  owner!: User;

  @OneToMany({ entity: () => PlayerInGame, mappedBy: 'game' })
  players = new Collection<PlayerInGame>(this);

  // Methods

  @Expose({ name: 'players' })
  jsonGetPlayers() {
    if (!this.players.isInitialized()) {
      return null;
    }

    return this.players.getItems().map((it) => ({
      ...(it as any),
      game: undefined,
    }));
  }

  async getPlayers() {
    return (await this.players.init()).getItems();
  }

  async availableNations() {
    const players = await this.getPlayers();

    const nations = Object.values(Nation).filter(
      (nation) =>
        nation !== Nation.NEUTRAL &&
        players.every((player) => player.nation !== nation),
    );

    return nations;
  }
}
