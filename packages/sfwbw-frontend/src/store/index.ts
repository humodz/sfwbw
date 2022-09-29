import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiGameSlice, apiUserSlice } from './api';
import { authReducer } from './authSlice';
import { counterReducer } from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
    [apiGameSlice.reducerPath]: apiGameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUserSlice.middleware)
      .concat(apiGameSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
