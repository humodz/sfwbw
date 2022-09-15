import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

const ACCESS_TOKEN = '/auth/accessToken';

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN)
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

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;

export const authReducer: Reducer<AuthState> = authSlice.reducer;