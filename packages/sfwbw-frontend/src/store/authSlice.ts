import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCurrentUserQuery } from './api';

const ACCESS_TOKEN = '/auth/accessToken';

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      const token = action.payload;

      if (!token) {
        localStorage.removeItem(ACCESS_TOKEN);
      } else {
        localStorage.setItem(ACCESS_TOKEN, token);
      }

      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

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

export const authReducer: Reducer<AuthState> = authSlice.reducer;
