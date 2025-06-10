import { useNavigate, useParams } from "react-router-dom";

import Navbar from "@/components/navbar";
import OverviewPichart from "@/components/overview-pichart";
import OverviewTabs from "@/components/overview-tabs";
import { useOverviewQuery } from "@/store/services/bulk";

import MailWhite from "../assets/img/mailWhite.svg";
import OverViewImg from "../assets/img/overviewimg.svg";

const Overview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useOverviewQuery(id as string, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  if (!data && !isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-lg font-semibold text-gray-600">
        No result. Please wait...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="pt-4 lg:px-20">
        <div className="h-full w-full space-y-10 rounded-xl bg-white p-5 lg:px-12 lg:py-5">
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-0">
            <div className="col-span-3 flex items-center justify-between">
              <div>
                <p>Name</p>
                <p className="font-bold">{data?.file_name ?? "N/A"}</p>
              </div>
              <img src={OverViewImg} alt="" />
              <div>
                <p>Emails</p>
                <p className="font-bold">{data?.total ?? "N/A"}</p>
              </div>
              <img src={OverViewImg} alt="" />
              <div>
                <p>Uploaded</p>
                <p className="font-bold">
                  {data?.uploaded_at ? data.uploaded_at.split("T")[0] : "N/A"}
                </p>
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-end lg:col-span-1">
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-10 py-0 text-white"
                onClick={() => navigate(`/view-emails/${id}`)}
              >
                <img src={MailWhite} alt="" className="size-5" />
                Email
              </button>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gray-300"></div>

          <div className="grid items-center lg:grid-cols-2">
            <div>
              {isLoading ? <p>Loading...</p> : <OverviewPichart data={data!} />}
            </div>
            <div>
              <h1>Conversion Funnel</h1>
              <div className="flex grid-cols-2 justify-between gap-[10%] lg:grid">
                <div className="flex w-full flex-col gap-4">
                  {[
                    {
                      label: "Deliverable",
                      value: data?.deliverable_percentage ?? 0,
                      color: "bg-green-500",
                    },
                    {
                      label: "Undeliverable",
                      value: data?.undeliverable_percentage ?? 0,
                      color: "bg-red-500",
                    },
                    {
                      label: "Risky",
                      value: data?.risky_percentage ?? 0,
                      color: "bg-yellow-400",
                    },
                    {
                      label: "Duplicate",
                      value: data?.duplicated_percentage ?? 0,
                      color: "bg-primary",
                    },
                  ].map(({ label, value, color }, idx) => (
                    <div
                      key={idx}
                      className="h-10 w-full rounded-xl bg-gray-500"
                    >
                      <div
                        className={`flex h-10 items-center justify-start rounded-xl pl-4 font-bold text-white ${color}`}
                        style={{ width: `${value}%` }}
                      >
                        {value > 0 ? label : ""}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-16 flex-col gap-4">
                  <p className="h-12 font-bold">{data?.deliverable ?? "N/A"}</p>
                  <p className="h-12 font-bold">
                    {data?.undeliverable ?? "N/A"}
                  </p>
                  <p className="h-12 font-bold">{data?.risky ?? "N/A"}</p>
                  <p className="h-12 font-bold">{data?.duplicates ?? "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gray-300"></div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <OverviewTabs id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
