import { setTestId } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postSingle_Email: builder.mutation<
      Single_Email,
      { data: { user_tested_email: string } }
    >({
      query: ({ data }) => ({
        url: "/email/single_email",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as unknown as {
          message: string;
          status: number;
          test_id: string;
          data: Single_Email;
        };
        dispatch(setTestId(result.data.test_id));
      },
    }),

    getSingle_Email: builder.query({
      query: (test_id: string) => ({
        url: `/email/single_email_status/${test_id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        status: number;
        data: VerifiedEmail;
      }) => response.data,
    }),

    getAllEmail: builder.query({
      query: () => ({
        url: "/email/all_single_emails",
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        status: number;
        data: VerifiedEmail[];
      }) => response.data,
    }),
    getEmailbyId: builder.query({
      query: (id: string) => ({
        url: `/email/single_email/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        status: number;
        data: VerifiedEmail;
      }) => response.data,
    }),
  }),
});

export const {
  usePostSingle_EmailMutation,
  useGetSingle_EmailQuery,
  useGetAllEmailQuery,
  useGetEmailbyIdQuery,
} = authApi;
