import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property({ type: String, nullable: true })
  email?: string | null;
}
