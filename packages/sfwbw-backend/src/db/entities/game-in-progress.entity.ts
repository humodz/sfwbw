import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class GameInProgress {
  @PrimaryKey()
  id!: number;
}
