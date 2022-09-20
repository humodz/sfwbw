import { ArgumentsHost, Type } from '@nestjs/common';
import { Response } from 'express';

export function getResponse(host: ArgumentsHost) {
  const context = host.switchToHttp();
  return context.getResponse<Response>();
}
