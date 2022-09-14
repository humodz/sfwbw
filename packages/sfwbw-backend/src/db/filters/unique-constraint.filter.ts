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
  catch(exception: ConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    const property = exception.constraint.split('_')[1];

    response.status(HttpStatus.CONFLICT).json({
      message: `${capitalize(property)} already in use`,
    });
  }
}

interface ConstraintError {
  detail: string;
  constraint: string;
}

function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}
