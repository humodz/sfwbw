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
import { by } from '@sfwbw/sfwbw-core';
import { removeSymbols } from '../../utils';
import { DesignMap } from './design-map.entity';
import { PlayerInGame } from './player-in-game.entity';
import { User } from './user.entity';

export enum GameStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
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

  @Property({ type: String, nullable: true })
  password!: string | null;

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

  @Expose({ name: 'hasPassword' })
  jsonHasPassword() {
    return Boolean(this.password);
  }

  @Expose({ name: 'players' })
  jsonGetPlayers() {
    if (!this.players.isInitialized()) {
      return null;
    }

    // TODO - use class-transformer groups?
    return this.players
      .getItems()
      .map((player) => ({
        ...removeSymbols(player),
        game: undefined,
      }))
      .sort(by((player) => player.order));
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
