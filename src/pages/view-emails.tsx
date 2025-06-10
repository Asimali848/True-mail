import { useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "@/components/navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFileEmailsQuery, useOverviewQuery } from "@/store/services/bulk";

import EmailForm from "../components/emailForm";

const statusFilters = [
  "All",
  "DELIVERABLE",
  "UNDELIVERABLE",
  "RISKY",
  "UNKNOWN",
];

const ViewEmails = () => {
  const { id } = useParams();

  const { data } = useOverviewQuery(id as string, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const { data: apiEmailData } = useFileEmailsQuery(id as string, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  console.log(apiEmailData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const handleEmailClick = (email: string) => {
    setSelected(email);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Navbar />
      <div className="w-full p-2 lg:px-20">
        {/* Header Info */}
        <div className="h-full w-full space-y-12 rounded-t-xl bg-white p-12 pb-5">
          <div className="grid grid-cols-3">
            <div>
              <p>Name</p>
              <p className="font-bold">{data?.file_name}</p>
            </div>
            <div>
              <p>Email</p>
              <p className="font-bold">{data?.total}</p>
            </div>
            <div>
              <p>Uploaded</p>
              <p className="font-bold">{data?.uploaded_at?.split("T")[0]}</p>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gray-300" />

          {/* Filter Buttons */}
          <div className="flex flex-col items-center justify-between md:flex-row">
            <h1 className="text-2xl font-bold">Emails</h1>
            <div className="flex flex-col gap-4 md:flex-row">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  className={`rounded-md border px-3 py-1 text-sm ${
                    activeStatus === status
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="h-full w-[calc(100vw-8px)] overflow-x-auto rounded-b-xl bg-white px-10 pb-20 lg:w-full">
          <table className="w-full table-auto border-collapse px-10">
            <thead className="px-10">
              <tr className="border-b border-gray-200 bg-gray-100 text-left">
                <th className="p-3 text-lg font-bold text-gray-700">Email</th>
                <th className="p-3 text-lg font-bold text-gray-700">Reason</th>
                <th className="p-3 text-lg font-bold text-gray-700">Score</th>
                <th className="p-3 text-lg font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {apiEmailData?.map((list) => (
                <tr className="border-b border-gray-100 px-10 hover:bg-gray-50">
                  <td
                    className="cursor-pointer p-3 text-xs text-gray-500"
                    onClick={() => handleEmailClick(`${list.id}`)}
                  >
                    {list.user_tested_email}
                  </td>
                  <td className="p-3">
                    <span className="truncate rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {list.reason}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="w-12 rounded-lg px-3 py-1 text-center text-xs">
                      {list.score}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {/* <BadgeCheck
                        fill={item.color}
                        className="size-5 text-white"
                      /> */}
                      {list.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-2 sm:min-w-fit">
          <EmailForm id={selected} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewEmails;
