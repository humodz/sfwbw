import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { PredeployedUnit, serializeTiles, Tile } from '@sfwbw/sfwbw-core';
import { Expose, Type } from 'class-transformer';
import { DictItem } from 'src/utils';
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

  @Expose()
  @Type(() => DictItem)
  @Property({ type: 'json' })
  units!: DictItem<[number, number], PredeployedUnit>[];

  @Expose({ name: 'tiles' })
  jsonGetTiles() {
    return serializeTiles(this.tiles);
  }
}
