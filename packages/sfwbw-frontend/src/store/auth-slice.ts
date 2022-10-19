import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isFetchError } from '../utils/errors';
import { useCurrentUserQuery } from './api';
import { useAppDispatch } from './hooks';

const ACCESS_TOKEN = '/auth/accessToken';

export interface AuthState {
  accessToken: string | null;
  redirectAfterLogin: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  redirectAfterLogin: false,
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
    setRedirectAfterLogin: (state, action: PayloadAction<boolean>) => {
      state.redirectAfterLogin = action.payload;
    },
  },
});

export const { setAccessToken, setRedirectAfterLogin } = authSlice.actions;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.accessToken !== null;

export const selectRedirectAfterLogin = (state: { auth: AuthState }) =>
  state.auth.redirectAfterLogin;

export function useCurrentUser(params?: { requiresAuth: boolean }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(selectAccessToken);

  const currentUserResult = useCurrentUserQuery(accessToken, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (params?.requiresAuth && !accessToken) {
      dispatch(setRedirectAfterLogin(true));
      navigate('/sign-in');
    }
  }, [dispatch, navigate, params, accessToken]);

  useEffect(() => {
    if (
      currentUserResult.isError &&
      isFetchError(currentUserResult.error, 401)
    ) {
      dispatch(setAccessToken(null));
    }
  }, [dispatch, currentUserResult]);

  if (!accessToken || !currentUserResult.isSuccess) {
    return null;
  }

  return currentUserResult.data;
}

export const authReducer: Reducer<AuthState> = authSlice.reducer;
