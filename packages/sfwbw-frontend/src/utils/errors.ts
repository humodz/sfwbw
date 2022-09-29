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

export function getErrorMessage(error: RtkQueryError): string {
  if ('message' in error) {
    return error.message || 'Serialization error';
  } else if ('data' in error) {
    return (
      (error.data as any)?.message || `Unknown fetch error: ${error.status}`
    );
  } else {
    return 'Unknown error';
  }
}
