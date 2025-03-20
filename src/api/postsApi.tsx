import { baseApi } from "./baseApi"; // Import base API

export const postsApi = baseApi.injectEndpoints({
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
  overrideExisting: false,
});
export const {
  useGetUserPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
