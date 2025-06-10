import { setTestId } from "../slices/global";
import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    copyPaste: builder.mutation({
      query: (body: CopyPaste) => ({
        url: "/email/copy_paste_email",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = (await queryFulfilled) as unknown as {
          data: CopyPasteResponse;
        };
        console.log(result);
        dispatch(setTestId(result.data.task_id));
      },
    }),
    record: builder.query({
      query: ({ test_id }) => ({
        url: `/email/copy_paste_email_status/{task_id}/${test_id}`,
        method: "GET",
      }),
      transformResponse: (response: Single_Email) => response,
    }),

    recordList: builder.query({
      query: () => ({
        url: "/email/all_files_with_delieved_emails_and_status",
        method: "GET",
      }),
      transformResponse: (response: RecordsList) => response.data,
    }),

    overview: builder.query({
      query: (file_id: string) => ({
        url: `/email/bulk_emails_file_stats/${file_id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        status: number;
        data: GetOverview;
      }) => response.data,
    }),

    fileEmails: builder.query({
      query: (file_id: string) => ({
        url: `/email/emails_for_csv/${file_id}?include_risky=false`,
        method: "GET",
      }),
      transformResponse: (response: Multi_Email) => response.data,
    }),
    deleteEmail: builder.mutation({
      query: (id: number) => ({
        url: `/email/bulk_emails_file_by_file_id?file_id=${id}`,
        method: "DELETE",
      }),
    }),
    downloadEmails: builder.mutation({
      query: ({
        id,
        include_risky,
      }: {
        id: number;
        include_risky: boolean;
      }) => ({
        url: `/email/emails_for_csv/${id}?include_risky=${include_risky}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCopyPasteMutation,
  useRecordQuery,
  useRecordListQuery,
  useOverviewQuery,
  useFileEmailsQuery,
  useDeleteEmailMutation,
  useDownloadEmailsMutation,
} = authApi;
