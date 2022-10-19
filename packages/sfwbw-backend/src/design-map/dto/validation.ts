import { applyDecorators } from '@nestjs/common';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  Max,
  Min,
} from 'class-validator';

export const IsPlayer = () => applyDecorators(IsInt(), Min(0), Max(4));

export const IsCoord = () =>
  applyDecorators(
    IsArray(),
    ArrayMinSize(2),
    ArrayMaxSize(2),
    IsInt({ each: true }),
    Min(0, { each: true }),
  );
