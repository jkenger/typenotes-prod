import apiSlice from "@/app/api/apiSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { setToken } from "./authSlice";
import { toast } from "react-toastify";
import { authApiUrl, logoutApiUrl, refreshApiUrl } from "@/constants";
import { HTTPMethods, TagTypes } from "@/components/types/types";

const authSlice = apiSlice.injectEndpoints({
  endpoints: (
    builder: EndpointBuilder<
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      TagTypes.NOTE | TagTypes.USER,
      "api"
    >
  ) => ({
    login: builder.mutation({
      query: ({ ...user }) => ({
        url: authApiUrl,
        method: HTTPMethods.POST,
        body: user,
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setToken({ accessToken }));
        } catch (err) {
          toast.error("Login failed. Please try again");
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: refreshApiUrl,
        method: HTTPMethods.GET,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          dispatch(setToken({ accessToken }));
        } catch (err) {
          toast.error("Refreshing token failed. Please log in again");
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: logoutApiUrl,
        method: HTTPMethods.POST,
      }),
      onQueryStarted: async (_, { dispatch }) => {
        dispatch(setToken(null));
        toast.error("Log out failed. Please try again");
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authSlice;
