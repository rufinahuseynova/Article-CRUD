import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_TOKEN, BASE_URL } from "@/config"; // Import common settings

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Posts"],
  endpoints: () => ({}),
});
