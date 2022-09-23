import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsString, Length } from 'class-validator';

export const IsGameName = () => applyDecorators(IsString(), Length(1, 64));
export const IsGamePassword = () =>
  applyDecorators(IsOptional(), IsString(), Length(1, 16));
