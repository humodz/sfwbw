import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { Session, UserSelf } from './models';
import { RegisterRequest, SignInRequest } from './requests';

export * from './models';
export * from './requests';

export const apiUserSlice = createApi({
  reducerPath: 'apiUser',
  baseQuery,
  endpoints: (builder) => ({
    // Note: argument is only for invalidating cache
    currentUser: builder.query<UserSelf, string | null>({
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
  }),
});

export const {
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
  useSignInMutation,
  useRegisterMutation,
} = apiUserSlice;
