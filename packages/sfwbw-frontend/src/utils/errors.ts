import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';

export type RtkQueryError = SerializedError | FetchBaseQueryError;
export type RkQueryErrorResult =
  | { isError: true; error: RtkQueryError }
  | { isError: false };

export function useErrorPopup(apiResult: RkQueryErrorResult) {
  useEffect(() => {
    if (apiResult.isError) {
      alert(getErrorMessage(apiResult.error));
    }
  }, [apiResult]);
}

export function formErrorMessage(message: string) {
  return (e: { target: any }) => e.target.setCustomValidity(message);
}

export function getErrorMessage(error: RtkQueryError): string {
  if ('message' in error) {
    return error.message || 'Serialization error';
  } else if ('data' in error) {
    const message =
      (error.data as any)?.message || `Unknown fetch error: ${error.status}`;

    if (Array.isArray(message)) {
      return message[0];
    }

    return message;
  } else {
    return 'Unknown error';
  }
}

export function isFetchError(
  error: RtkQueryError,
  status?: number,
): error is FetchBaseQueryError {
  return 'status' in error && (status === undefined || status === error.status);
}
