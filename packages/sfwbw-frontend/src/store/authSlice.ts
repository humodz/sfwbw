import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('/auth/accessToken')
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('/auth/accessToken', action.payload);
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const authReducer = authSlice.reducer;