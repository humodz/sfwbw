import { UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UniqueConstraintViolationException)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(exception: { detail: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: exception.detail,
    });
  }
}
