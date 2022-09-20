import { NotFoundError } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { getResponse } from '../../utils/nest';

@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    getResponse(host).status(HttpStatus.NOT_FOUND).json({
      message: exception.message,
    });
  }
}
