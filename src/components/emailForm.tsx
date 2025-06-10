import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Loader from "@/assets/img/Loader.gif";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import {
  useGetEmailbyIdQuery,
  useGetSingle_EmailQuery,
} from "@/store/services/single";

interface EmailFormProps {
  id?: string;
}

const EmailForm = ({ id }: EmailFormProps) => {
  const [stopPollingTest, setStopPollingTest] = useState(false);
  const [stopPollingSingle, setStopPollingSingle] = useState(false);
  const { test_id } = useSelector((state: RootState) => state.global);

  const { data: single, isLoading: singleLoading } = useGetEmailbyIdQuery(
    `${id}`,
    {
      skip: !id || stopPollingSingle,
      pollingInterval: 3000,
    }
  );

  const { data: test, isLoading: testLoading } = useGetSingle_EmailQuery(
    `${test_id}`,
    { skip: !test_id || stopPollingTest, pollingInterval: 3000 }
  );

  useEffect(() => {
    if (single) {
      setStopPollingSingle(true);
    }
  }, [single]);

  useEffect(() => {
    if (test) {
      setStopPollingTest(true);
    }
  }, [test]);

  return (
    <div className="mx-auto h-full max-h-screen w-full overflow-y-auto rounded-lg px-4 py-7">
      {singleLoading || testLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <img src={Loader} alt="" className="aspect-square size-60" />
          <p className="text-xl font-bold">Loading...</p>
        </div>
      ) : (id ? single : test) !== null ? (
        <div className="p-1 lg:p-5">
          <div className="flex w-full items-center gap-5">
            <img
              src="https://ui.shadcn.com/avatars/02.png"
              className="size-10 shrink-0 rounded-full bg-[#7F61FF] p-0.5 lg:size-16"
              alt=""
            />
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-lg font-semibold lg:text-2xl">
                  {(id ? single : test)?.full_name}
                </p>
                <p className="text-sm">
                  {(id ? single : test)?.user_tested_email}
                </p>
              </div>
              <div
                className={cn(
                  "rounded-xl px-4 py-2 font-bold text-amber-50 lg:text-2xl",
                  {
                    "bg-red-500": (id ? single : test)?.score! < 50,
                    "bg-orange-500":
                      (id ? single : test)?.score! >= 50 &&
                      (id ? single : test)?.score! < 60,
                    "bg-amber-500":
                      (id ? single : test)?.score! >= 60 &&
                      (id ? single : test)?.score! < 70,
                    "bg-lime-500":
                      (id ? single : test)?.score! >= 70 &&
                      (id ? single : test)?.score! < 80,
                    "bg-green-500": (id ? single : test)?.score! >= 90,
                  }
                )}
              >
                <p>{(id ? single : test)?.score}</p>
              </div>
            </div>
          </div>

          <div className="w-full py-10 md:px-4">
            <div className="relative h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
                <div className="h-6 w-6 rounded-full border-4 border-white bg-red-500" />
              </div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 transform">
                <div className="h-6 w-6 rounded-full border-4 border-white bg-orange-400" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 transform">
                <div className="h-6 w-6 rounded-full border-4 border-white bg-yellow-400" />
              </div>
              <div className="absolute left-3/4 top-1/2 -translate-y-1/2 transform">
                <div className="h-6 w-6 rounded-full border-4 border-white bg-lime-400" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                <div className="h-6 w-6 rounded-full border-4 border-white bg-green-500" />
              </div>
            </div>
          </div>

          <p className="text-lg font-bold lg:text-2xl">General</p>
          <div className="grid grid-cols-1 gap-3 pt-5 md:grid-cols-2 md:gap-10">
            <div className="grid grid-cols-2">
              <div className="flex flex-col items-start gap-3 text-[#5C6584]">
                <p>Full Name</p>
                <p>Status</p>
                <p>Domain</p>
              </div>
              <div className="flex flex-col items-start gap-3 font-bold">
                <p>{(id ? single : test)?.full_name}</p>
                <p className="capitalize">{(id ? single : test)?.status}</p>
                <p className="capitalize">{(id ? single : test)?.domain}</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col items-start gap-3 text-[#5C6584]">
                <p>Gender</p>
                <p>Reason</p>
              </div>
              <div className="flex flex-col items-start gap-3 font-bold">
                <p>{(id ? single : test)?.gender || "N/A"}</p>
                <p>{(id ? single : test)?.reason}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold">Details</p>
          <div className="grid w-full grid-cols-1 gap-2 pt-5 md:grid-cols-2 md:gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-3 text-[#5C6584]">
                <p>Free</p>
                <p>Disposable</p>
                <p>Tag</p>
                <p>Alphabetical Characters</p>
                <p>Mailbox Full</p>
              </div>
              <div className="flex flex-col items-start gap-3 font-bold">
                <p>{(id ? single : test)?.is_free ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.is_disposable ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.has_tag ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.alphabetical_characters}</p>
                <p>{(id ? single : test)?.is_mailbox_full ? "YES" : "NO"}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-3 text-[#5C6584]">
                <p>Role</p>
                <p>Accept All</p>
                <p>Numerical Characters</p>
                <p>Unicode Symbols</p>
                <p>No Reply</p>
              </div>
              <div className="flex flex-col items-start gap-3 font-bold">
                <p>{(id ? single : test)?.has_role ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.is_accept_all ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.has_numerical_characters}</p>
                <p>
                  {(id ? single : test)?.has_unicode_symbols ? "YES" : "NO"}
                </p>
                <p>{(id ? single : test)?.has_no_reply ? "YES" : "NO"}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold">Mail Server Info</p>
          <div className="grid grid-cols-1 gap-3 pt-5 md:grid-cols-2 md:gap-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-3 text-[#5C6584]">
                <p>SMTP Provider</p>
                <p>Implicit MX Record</p>
                <p>MX Record</p>
              </div>
              <div className="flex flex-col items-start gap-3 font-bold">
                <p>{(id ? single : test)?.smtp_provider}</p>
                <p>{(id ? single : test)?.implicit_mx_record ? "YES" : "NO"}</p>
                <p>{(id ? single : test)?.mx_record || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <img src={Loader} alt="" className="aspect-square size-60" />
          <p className="text-xl font-bold">Still Working...</p>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
