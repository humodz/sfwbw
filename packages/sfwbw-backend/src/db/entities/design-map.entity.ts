import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

@Entity()
export class DesignMap {
  @Expose()
  @PrimaryKey()
  id!: number;

  @Expose()
  @Property({ type: 'int' })
  maxPlayers!: number;

  @Expose()
  @Property({ type: 'int' })
  rows!: number;

  @Expose()
  @Property({ type: 'int' })
  columns!: number;

  @Expose()
  @Property({ type: 'json' })
  data!: unknown;
}
