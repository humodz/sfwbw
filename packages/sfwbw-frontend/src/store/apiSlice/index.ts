import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Deleted, transformResponseDeleted } from '../../utils/deleted';
import { selectAccessToken } from '../authSlice';
import { Game, Session, UserSelf } from './models';
import {
  JoinGameRequest,
  RegisterRequest,
  SignInRequest,
  UpdatePlayerRequest,
} from './requests';

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
    deleteGame: builder.mutation<Deleted<number>, { gameId: number }>({
      query: (params) => ({
        url: `games/@${params.gameId}`,
        method: 'DELETE',
      }),
      transformResponse: (_response, _meta, args) => ({
        id: args.gameId,
        deleted: true,
      }),
    }),

    joinGame: builder.mutation<Game, JoinGameRequest>({
      query: (params) => ({
        url: `/games/@${params.gameId}/players/self`,
        method: 'POST',
        body: {
          password: params.password,
        },
      }),
    }),
    leaveGame: builder.mutation<Game | Deleted<number>, { gameId: number }>({
      query: (params) => ({
        url: `/games/@${params.gameId}/players/self`,
        method: 'DELETE',
      }),
      transformResponse: transformResponseDeleted((args) => args.gameId),
    }),
    updatePlayer: builder.mutation<Game, UpdatePlayerRequest>({
      query: (params) => ({
        url: `/games/@${params.gameId}/players/self`,
        method: 'PUT',
        body: {
          nation: params.nation,
          ready: params.ready,
        },
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
  useJoinGameMutation,
  useLeaveGameMutation,
  useUpdatePlayerMutation,
  useDeleteGameMutation,
} = apiSlice;
