import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TOKEN =
  "28dff6afcdca22acdf01e2ff1dd14a1468a63dc852789ef47fd0b85b44d15fdd";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gorest.co.in/public/v2/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, perPage = 20 }) => ({
        url: `users?page=${page}&per_page=${perPage}`,
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
