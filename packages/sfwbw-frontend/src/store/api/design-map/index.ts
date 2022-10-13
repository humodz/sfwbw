import { createApi } from '@reduxjs/toolkit/query/react';
import { serializeTiles } from '@sfwbw/sfwbw-core';
import { Deleted, makeDeleted } from '../../../utils/deleted';
import { baseQuery } from '../baseQuery';
import { deserializeDesignMap, DesignMap, RawDesignMap } from './models';
import {
  CreateMapRequest,
  SearchMapsRequest,
  UpdateMapRequest,
} from './requests';

export * from './models';
export * from './requests';

export const apiDesignMapSlice = createApi({
  reducerPath: 'apiDesignMap',
  baseQuery,
  endpoints: (builder) => ({
    searchMaps: builder.query<DesignMap[], SearchMapsRequest>({
      query: (params) => ({
        method: 'GET',
        url: '/design-maps',
        params,
      }),
      transformResponse(response: RawDesignMap[]) {
        return response.map(deserializeDesignMap);
      },
    }),
    createMap: builder.mutation<DesignMap, CreateMapRequest>({
      query: (params) => ({
        method: 'POST',
        url: '/design-maps',
        body: { ...params, tiles: serializeTiles(params.tiles) },
      }),
      transformResponse: deserializeDesignMap,
    }),
    getMapById: builder.query<DesignMap, number>({
      query: (id) => ({
        method: 'GET',
        url: `/design-maps/@${id}`,
      }),
      transformResponse: deserializeDesignMap,
    }),
    updateMap: builder.mutation<DesignMap, UpdateMapRequest>({
      query: (params) => ({
        method: 'PUT',
        url: `/design-maps/@${params.id}`,
        body: { ...params.data, tiles: serializeTiles(params.data.tiles) },
      }),
      transformResponse: deserializeDesignMap,
    }),
    deleteMap: builder.mutation<Deleted<number>, number>({
      query: (designMapId) => ({
        method: 'DELETE',
        url: `/design-maps/@${designMapId}`,
      }),
      transformResponse(_response, _meta, designMapId) {
        return makeDeleted(designMapId);
      },
    }),
  }),
});

export const {
  useSearchMapsQuery,
  useCreateMapMutation,
  useUpdateMapMutation,
  useDeleteMapMutation,
  useGetMapByIdQuery,
} = apiDesignMapSlice;
