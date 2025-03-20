// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const postsApi = createApi({
//   reducerPath: "postsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2/" }),
//   tagTypes: ["Posts"],
//   endpoints: (builder) => ({
//     getUserPosts: builder.query({
//       query: (userId) => `users/${userId}/posts`,
//       providesTags: ["Posts"],
//     }),
//     createPost: builder.mutation({
//       query: (newPost) => ({
//         url: `users/${newPost.user_id}/posts`,
//         method: "POST",
//         body: newPost,
//         headers: {
//           Authorization: `28dff6afcdca22acdf01e2ff1dd14a1468a63dc852789ef47fd0b85b44d15fdd`,
//         },
//       }),
//       invalidatesTags: ["Posts"],
//     }),
//     updatePost: builder.mutation({
//       query: ({ postId, updatedData }) => ({
//         url: `posts/${postId}`,
//         method: "PUT",
//         body: updatedData,
//         headers: {
//           Authorization: `28dff6afcdca22acdf01e2ff1dd14a1468a63dc852789ef47fd0b85b44d15fdd`,
//         },
//       }),
//       invalidatesTags: ["Posts"],
//     }),
//     deletePost: builder.mutation({
//       query: (postId) => ({
//         url: `posts/${postId}`,
//         method: "DELETE",
//         headers: {
//           Authorization: `28dff6afcdca22acdf01e2ff1dd14a1468a63dc852789ef47fd0b85b44d15fdd`,
//         },
//       }),
//       invalidatesTags: ["Posts"],
//     }),
//   }),
// });

// export const {
//   useGetUserPostsQuery,
//   useCreatePostMutation,
//   useUpdatePostMutation,
//   useDeletePostMutation,
// } = postsApi;

//------------------------------------------------------------------------------------------------------------------------------

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TOKEN =
  "28dff6afcdca22acdf01e2ff1dd14a1468a63dc852789ef47fd0b85b44d15fdd";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gorest.co.in/public/v2/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getUserPosts: builder.query({
      query: ({ userId, titleQuery, bodyQuery }) => {
        let params = `users/${userId}/posts?`;
        if (titleQuery) params += `title=${encodeURIComponent(titleQuery)}&`;
        if (bodyQuery) params += `body=${encodeURIComponent(bodyQuery)}`;
        return params;
      },
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation({
      query: (newPost) => ({
        url: `users/${newPost.user_id}/posts`,
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation({
      query: ({ postId, updatedData }) => ({
        url: `posts/${postId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
