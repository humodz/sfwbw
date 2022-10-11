import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { deserializeDesignMap, DesignMap, RawDesignMap } from './models';

export * from './models';

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
  }),
});

export const { useSearchMapsQuery } = apiDesignMapSlice;
