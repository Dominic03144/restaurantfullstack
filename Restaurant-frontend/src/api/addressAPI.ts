// ✅ src/api/addressAPI.ts
import { apiSlice } from "../api/apiSlice"; // make sure this exists

import type { EndpointBuilder } from '@reduxjs/toolkit/query';

export const addressAPI = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getAddressesByUserId: builder.query<{ /* address fields */ }[], number>({
      query(userId: number) {
        return `/addresses/user/${userId}`;
      },
    }),
  }),
});

export const { useGetAddressesByUserIdQuery } = addressAPI;
