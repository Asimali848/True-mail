import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: Profile) => response.data,
    }),

    profileUpdate: builder.mutation({
      query: (body: ProfileUpdate) => ({
        url: "/user/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (body: ChangePassword) => ({
        url: "/auth/change_password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useProfileUpdateMutation,
  useChangePasswordMutation,
} = authApi;
