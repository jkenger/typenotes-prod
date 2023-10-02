/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRefreshResult, TagTypes } from "@/components/types/types";
import { baseApiUrl } from "@/constants";
import { setToken } from "@/features/auth/authSlice";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);
  // If you want, handle other status codes, too
  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as IRefreshResult;

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setToken({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.error = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth as typeof baseQuery,
  tagTypes: [TagTypes.NOTE, TagTypes.USER], // "Note", "User"
  // note
  endpoints: () => ({}),
});

export default apiSlice;
