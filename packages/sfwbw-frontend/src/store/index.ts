import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { authReducer } from './authSlice';
import { counterReducer } from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
