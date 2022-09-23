import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAccessToken } from '../authSlice';
import { Game, Session, UserSelf } from './models';
import { RegisterRequest, SignInRequest } from './requests';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${window.location.hostname}:3000`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = selectAccessToken(getState() as any);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    currentUser: builder.query<UserSelf, Record<string, never>>({
      query: () => ({
        url: '/users/self',
      }),
    }),
    signIn: builder.mutation<Session, SignInRequest>({
      query: (body) => ({
        url: '/auth/session',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<UserSelf, RegisterRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),

    listGames: builder.query<Game[], Record<string, never>>({
      query: () => ({
        url: '/games',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
  useSignInMutation,
  useRegisterMutation,
  useListGamesQuery,
} = apiSlice;
