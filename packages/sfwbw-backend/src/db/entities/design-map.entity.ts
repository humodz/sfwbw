import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { serializeTiles, Tile } from '@sfwbw/sfwbw-core';
import { User } from './user.entity';

@Entity()
export class DesignMap {
  @Expose()
  @PrimaryKey()
  id!: number;

  @Expose()
  @ManyToOne({ entity: () => User, inversedBy: 'designMaps' })
  author!: User;

  @Expose()
  @Unique()
  @Property({ type: String })
  name!: string;

  @Expose()
  @Property({ type: 'int' })
  maxPlayers!: number;

  @Expose()
  @Property({ type: 'int' })
  rows!: number;

  @Expose()
  @Property({ type: 'int' })
  columns!: number;

  @Property({ type: 'json' })
  tiles!: Tile[][];

  @Expose({ name: 'tiles' })
  jsonGetTiles() {
    return serializeTiles(this.tiles);
  }
}
