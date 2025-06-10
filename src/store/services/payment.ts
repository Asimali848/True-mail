import { api } from "./core";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    invoice: builder.query({
      query: () => ({
        url: "/stripe/invoices",
        method: "GET",
      }),
      transformResponse: (response: Invoices) => response.data,
    }),

    payment: builder.mutation({
      query: (data: Stripe) => ({
        url: "/stripe/create_checkout_session",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInvoiceQuery, usePaymentMutation } = authApi;
