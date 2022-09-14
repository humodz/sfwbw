import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session, User } from './models';
import { RegisterRequest, SignInRequest } from './requests';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: builder => ({
    signIn: builder.mutation<Session, SignInRequest>({
      query: (body) => ({
        url: '/auth/session',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useRegisterMutation,
} = apiSlice;