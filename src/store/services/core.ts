import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "..";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).global?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);

    headers.append("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWith401Handling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   window.location.replace("?intent='terminated'");
  // }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWith401Handling,
  keepUnusedDataFor: 5,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
