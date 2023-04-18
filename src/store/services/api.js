import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/apiEndpoints";
import jwt_decode from "jwt-decode";
import { refreshToken } from "../utils/apiEndpoints";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: (headers, { getState }) => {
      const access_token = getState().auth.tokens?.access.value;
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UNAUTHORIZED", "UNKNOWN_ERROR", "PROFILE", "POSTS"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `account/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [{ type: "PROFILE", id }]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"],
    }),
    getPosts: builder.query({
      query: (id) => `posts/by_author/${id}/`,
      providesTags: (result, error, id) => [{ type: "POSTS", id }],
    }),
    test: builder.mutation({
      query: (userRequest) => ({
        url: `translate/`,
        method: "POST",
        body: userRequest,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: getToken,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      transformResponse: (response) => {
        const access_info = jwt_decode(response.access);
        return {
          tokens: {
            refresh: response.refresh,
            access: {
              value: response.access,
              exp: access_info.exp,
            },
          },
          user: { id: access_info.user_id, username: access_info.username },
        };
      },
    }),
    refreshTokens: builder.mutation({
      query: (refresh_tkn) => {
        return {
          url: refreshToken,
          method: "POST",
          body: {
            refresh: refresh_tkn,
          },
        };
      },
      transformResponse: (response) => {
        const access_info = jwt_decode(response.access);
        return {
          refresh: response.refresh,
          access: {
            value: response.access,
            exp: access_info.exp,
          },
        };
      },
    }),
    refetchErroredQueries: builder.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["UNKNOWN_ERROR"],
    }),
    // protected: builder.mutation({
    //   query: () => "protected",
    // }),
  }),
});

export default api;

export const {
  useLoginMutation,
  useProtectedMutation,
  useGetProfileQuery,
  useRefreshTokensMutation,
  useGetPostsQuery,
  useTestMutation,
} = api;
