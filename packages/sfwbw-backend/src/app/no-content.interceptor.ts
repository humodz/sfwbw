import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getResponse } from '../utils';

@Injectable()
export class NoContentInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = getResponse(context);

    return next.handle().pipe(
      tap((data) => {
        if (!data) {
          response.status(HttpStatus.NO_CONTENT);
        }
      }),
    );
  }
}
