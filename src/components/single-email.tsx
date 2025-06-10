import { useState } from "react";

import { BadgeCheck, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGetAllEmailQuery } from "@/store/services/single";

import EmailForm from "./emailForm";
import { Dialog, DialogContent } from "./ui/dialog";

const SingleEmail = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const { data: AllEmail = [], isLoading } = useGetAllEmailQuery({
    pollingInterval: 3000,
  });

  const handleEmailClick = (emailId: string) => {
    setSelected(emailId);
    setIsModalOpen(true);
  };

  const filteredEmails = AllEmail.filter((row) =>
    row.user_tested_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-330px)] w-full overflow-y-auto rounded-2xl bg-white">
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredEmails.length ? (
        filteredEmails.map((row, idx) => {
          const isValidEmail = row?.status === "valid";

          return (
            <div
              key={idx}
              onClick={() => handleEmailClick(`${row.id}`)}
              className="flex w-[calc(100vw-2rem)] cursor-pointer items-center justify-between overflow-x-auto px-8 py-4 hover:bg-gray-100 lg:w-full"
            >
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-primary"></div>
                <p>{row?.user_tested_email}</p>
              </div>

              <div className="flex gap-2">
                <BadgeCheck
                  fill={isValidEmail ? "#22c55e" : "#ef4444"}
                  className="text-white"
                />
                <p>{row?.status}</p>
                <p
                  className={cn(
                    "flex items-center rounded-md px-2 text-center text-sm text-white",
                    isValidEmail ? "bg-[#22c55e]" : "bg-[#ef4444]"
                  )}
                >
                  {row?.score}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <TriangleAlert className="size-14 text-destructive" />
          <p className="text-gray-500">No Records found</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-2 sm:min-w-fit">
          <EmailForm id={selected} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleEmail;
