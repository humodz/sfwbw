import {
  BaseQueryFn,
  TypedUseMutationResult,
  TypedUseQueryStateResult,
} from '@reduxjs/toolkit/query/react';
import { RtkQueryError } from './errors';

export type RtkQueryResult<Data, Error = RtkQueryError> =
  | TypedUseQueryStateResult<
      Data,
      unknown,
      BaseQueryFn<unknown, unknown, Error>
    >
  | (TypedUseMutationResult<
      Data,
      unknown,
      BaseQueryFn<unknown, unknown, Error>
    > & { isFetching?: undefined });

export function isSuccessResponse<T>(response: any): response is { data: T } {
  return 'data' in response;
}

export function isErrorResponse(response: any): response is { error: any } {
  return 'error' in response;
}

export type RtkMutationResponse<
  T extends () => readonly [(...args: any) => Promise<any>, any],
> = Awaited<ReturnType<ReturnType<T>[0]>>;
