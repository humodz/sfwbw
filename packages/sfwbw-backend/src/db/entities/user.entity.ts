import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Expose } from 'class-transformer';
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

  @Unique()
  @Property({ type: String, nullable: true })
  @Expose()
  email?: string | null;

  @Property()
  role!: 'player' | 'admin';
}
