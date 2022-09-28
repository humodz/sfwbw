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
    currentUser: builder.query<UserSelf, unknown>({
      query: () => ({
        url: '/users/self',
      }),
    }),
    signIn: builder.mutation<Session, SignInRequest>({
      query: (body) => ({
        method: 'POST',
        url: '/auth/session',
        body,
      }),
    }),
    register: builder.mutation<UserSelf, RegisterRequest>({
      query: (body) => ({
        method: 'POST',
        url: '/users',
        body,
      }),
    }),

    searchGames: builder.query<Game[], string>({
      query: (param) => ({
        method: 'GET',
        url: '/games',
        params: { search: param },
      }),
    }),
    deleteGame: builder.mutation<Deleted<number>, { gameId: number }>({
      query: (params) => ({
        method: 'DELETE',
        url: `games/@${params.gameId}`,
      }),
      transformResponse: (_response, _meta, args) => ({
        id: args.gameId,
        deleted: true,
      }),
    }),

    joinGame: builder.mutation<Game, JoinGameRequest>({
      query: (params) => ({
        method: 'POST',
        url: `/games/@${params.gameId}/players/self`,
        params: {
          password: params.password,
        },
      }),
    }),
    leaveGame: builder.mutation<Game | Deleted<number>, { gameId: number }>({
      query: (params) => ({
        method: 'DELETE',
        url: `/games/@${params.gameId}/players/self`,
      }),
      transformResponse: transformResponseDeleted((args) => args.gameId),
    }),
    updatePlayer: builder.mutation<Game, UpdatePlayerRequest>({
      query: (params) => ({
        method: 'PUT',
        url: `/games/@${params.gameId}/players/self`,
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
  useSearchGamesQuery,
  useJoinGameMutation,
  useLeaveGameMutation,
  useUpdatePlayerMutation,
  useDeleteGameMutation,
  useLazySearchGamesQuery,
} = apiSlice;
