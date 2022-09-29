import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { selectAccessToken } from '../authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: `http://${window.location.hostname}:3000`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = selectAccessToken(getState() as any);

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});
