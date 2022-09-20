import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UdpatePlayerRequest {
  @IsOptional()
  @IsString()
  password?: string | null;

  @IsBoolean()
  ready!: boolean;
}
