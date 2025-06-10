import { useInvoiceQuery } from "@/store/services/payment";

const Invoice = () => {
  const { data } = useInvoiceQuery({});

  return (
    <div className="overflow-x-auto pt-20">
      <div className="min-w-full rounded-2xl md:bg-white">
        <p className="px-10 py-5 text-2xl font-bold">Invoice</p>

        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-[#F5F6F8CC] font-semibold">
              <th className="px-10 py-4">Amount</th>
              <th className="px-10 py-4">Status</th>
              <th className="px-10 py-4">Number</th>
              <th className="px-10 py-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((invoice, index) => (
              <tr key={index} className="border-t bg-white md:bg-transparent">
                <td className="px-10 py-4 text-lg font-bold">
                  {(Number(invoice.amount) / 100).toFixed(2)}
                </td>
                <td className="px-10 py-4">
                  <span className="inline-block rounded-full bg-[#3D6BD8] px-7 py-2 text-center text-white">
                    {invoice.status === true ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="px-10 py-4">{invoice.number}</td>
                <td className="px-10 py-4">
                  {invoice.created_at.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
