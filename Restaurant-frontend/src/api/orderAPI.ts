import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrdersByUserId: builder.query({
      query: (userId: number) => `/orders/user/${userId}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersByUserIdQuery,
  useCreateOrderMutation,
} = orderAPI;
