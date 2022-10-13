import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { deserializeDesignMap, DesignMap, RawDesignMap } from './models';
import { CreateMapRequest, UpdateMapRequest } from './requests';

export * from './models';
export * from './requests';

export const apiDesignMapSlice = createApi({
  reducerPath: 'apiDesignMap',
  baseQuery,
  endpoints: (builder) => ({
    searchMaps: builder.query<DesignMap[], string>({
      query: (param) => ({
        method: 'GET',
        url: '/design-maps',
        params: { search: param },
      }),
      transformResponse(response: RawDesignMap[]) {
        return response.map(deserializeDesignMap);
      },
    }),
    createMap: builder.mutation<DesignMap, CreateMapRequest>({
      query: (params) => ({
        method: 'POST',
        url: '/design-maps',
        body: params,
      }),
      transformResponse: deserializeDesignMap,
    }),
    updateMap: builder.mutation<DesignMap, UpdateMapRequest>({
      query: (params) => ({
        method: 'PUT',
        url: `/design-maps/@${params.id}`,
        body: params.data,
      }),
      transformResponse: deserializeDesignMap,
    }),
  }),
});

export const {
  useSearchMapsQuery,
  useCreateMapMutation,
  useUpdateMapMutation,
} = apiDesignMapSlice;
