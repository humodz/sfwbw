import { configureStore, ThunkAction, Action, isPlain } from '@reduxjs/toolkit';
import { apiGameSlice, apiUserSlice } from './api';
import { apiDesignMapSlice } from './api/design-map';
import { authReducer } from './auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
    [apiGameSlice.reducerPath]: apiGameSlice.reducer,
    [apiDesignMapSlice.reducerPath]: apiDesignMapSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: any) =>
          isPlain(value) || value instanceof Map || value instanceof Set,
      },
    }).concat(
      apiUserSlice.middleware,
      apiGameSlice.middleware,
      apiDesignMapSlice.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
