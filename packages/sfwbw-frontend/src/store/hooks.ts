import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '.';
import { useCurrentUserQuery } from './api';
import { selectAccessToken } from './authSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useCurrentUser() {
  const accessToken = useSelector(selectAccessToken);

  const { data, refetch, isSuccess } = useCurrentUserQuery(
    {},
    { skip: !accessToken },
  );

  useEffect(() => {
    refetch();
  }, [refetch, accessToken]);

  if (!accessToken || !isSuccess) {
    return null;
  }

  return data || null;
}
