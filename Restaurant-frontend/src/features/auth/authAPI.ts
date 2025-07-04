// src/features/auth/authAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Request payload types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  contactPhone: string;
  password: string;
  userType: string;
  confirmationCode?: string;
}

export interface RequestPasswordReset {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// User object returned from the backend
export interface AuthUser {
  userId: number;
  userName: string;
  email: string;
  userType: string;
}

// Auth response structure
export interface AuthResponse {
  user: AuthUser;
  token?: string;
  message?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    requestPasswordReset: builder.mutation<{ message: string }, RequestPasswordReset>({
      query: (body) => ({
        url: "/password-reset",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: ({ token, newPassword }) => ({
        url: `/reset/${token}`,
        method: "PUT",
        body: { newPassword },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = authApi;
