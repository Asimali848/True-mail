import { setToken } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: Login) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as unknown as LoginResponse;
        console.log("iuyiuy", result);
        dispatch(setToken(result.data.firebase_id_token));
      },
    }),

    register: builder.mutation({
      query: (body: Register) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    forget: builder.mutation({
      query: (body: Forget) => ({
        url: "/auth/forgot_password",
        method: "POST",
        body,
      }),
    }),
    googleLogin: builder.query({
      query: () => ({
        url: "/auth/login_google",
        method: "GET",
      }),
    }),

    facebookLogin: builder.query({
      query: () => ({
        url: "/auth/login_facebook",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetMutation,
  useLazyGoogleLoginQuery,
  useLazyFacebookLoginQuery,
} = authApi;
