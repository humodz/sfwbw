import { IsBoolean } from 'class-validator';

export class UdpatePlayerRequest {
  @IsBoolean()
  ready!: boolean;
}
