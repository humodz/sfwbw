import { createApi } from '@reduxjs/toolkit/query/react';
import { Deleted, makeDeleted } from '../../../utils/deleted';
import { baseQuery } from '../baseQuery';
import { deserializeGame, Game, RawGame } from './models';
import { JoinGameRequest, UpdatePlayerRequest } from './requests';

export * from './models';
export * from './requests';

export const apiGameSlice = createApi({
  reducerPath: 'apiGame',
  baseQuery,
  endpoints: (builder) => ({
    searchGames: builder.query<Game[], string>({
      query: (param) => ({
        method: 'GET',
        url: '/games',
        params: { search: param },
      }),
      transformResponse(response: RawGame[]) {
        return response.map(deserializeGame);
      },
    }),
    deleteGame: builder.mutation<Deleted<number>, { gameId: number }>({
      query: (params) => ({
        method: 'DELETE',
        url: `games/@${params.gameId}`,
      }),
      transformResponse: (_response, _meta, params) =>
        makeDeleted(params.gameId),
    }),

    joinGame: builder.mutation<Game, JoinGameRequest>({
      query: (params) => ({
        method: 'POST',
        url: `/games/@${params.gameId}/players/self`,
        params: {
          password: params.password,
        },
      }),
      transformResponse: deserializeGame,
    }),
    leaveGame: builder.mutation<Game | Deleted<number>, { gameId: number }>({
      query: (params) => ({
        method: 'DELETE',
        url: `/games/@${params.gameId}/players/self`,
      }),
      transformResponse(response: RawGame, _meta, args) {
        if (!response) {
          return makeDeleted(args.gameId);
        } else {
          return deserializeGame(response);
        }
      },
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
      transformResponse: deserializeGame,
    }),
  }),
});

export const {
  useSearchGamesQuery,
  useJoinGameMutation,
  useLeaveGameMutation,
  useUpdatePlayerMutation,
  useDeleteGameMutation,
  useLazySearchGamesQuery,
} = apiGameSlice;
