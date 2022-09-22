import { IsBoolean } from 'class-validator';

export class UpdatePlayerRequest {
  @IsBoolean()
  ready!: boolean;
}
