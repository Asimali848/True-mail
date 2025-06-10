import { useState } from "react";

import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";

import { downloadCSV } from "@/lib/utils";
import { useDownloadEmailsMutation } from "@/store/services/bulk";

import MaxReach from "../assets/img/maxreach.svg";
import CustomToast from "./ui/custom-toast";

type OverviewTabsProps = {
  id: string | undefined;
};

const OverviewTabs = ({ id }: OverviewTabsProps) => {
  const [activeTab, setActiveTab] = useState<"deliverability" | "reach">(
    "deliverability"
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [download, { isLoading }] = useDownloadEmailsMutation();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const include_risky = activeTab === "deliverability";

      const response = await download({
        id: Number(id),
        include_risky,
      }).unwrap();

      if (response?.data) {
        downloadCSV(response.data);
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Success"
            description="CSV downloaded successfully"
          />
        ));
      } else {
        throw new Error("No CSV data received");
      }
    } catch (error) {
      console.error("CSV download failed:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Download failed! Please try again."
        />
      ));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-10">
      <div className="flex items-start justify-center gap-6">
        <button
          onClick={() => setActiveTab("deliverability")}
          className={`w-full max-w-xs rounded-2xl bg-gray-50 px-4 py-6 text-center transition-all duration-200 hover:shadow-md md:w-72 ${activeTab === "deliverability" ? "border border-[#3D6BD8] shadow-sm" : "border border-gray-200"}`}
        >
          <BadgeCheck
            fill="#3D6BD8"
            className="mx-auto mb-2 size-8 text-white"
          />
          <h2 className="font-bold text-gray-800">Maximum Deliverability</h2>
          <p className="text-sm text-gray-500">
            Include deliverable emails only
          </p>
        </button>

        {/* Reach Tab */}
        <button
          onClick={() => setActiveTab("reach")}
          className={`w-full max-w-xs rounded-2xl bg-gray-50 px-4 py-6 text-center transition-all duration-200 hover:shadow-md md:w-72 ${activeTab === "reach" ? "border border-[#3D6BD8] shadow-sm" : "border border-gray-200"}`}
        >
          <img src={MaxReach} alt="Max Reach" className="mx-auto mb-2 size-8" />
          <h2 className="font-bold text-gray-800">Maximum Reach</h2>
          <p className="text-sm text-gray-500">Include risky emails also</p>
        </button>
      </div>

      <div className="flex w-full justify-end">
        <button
          onClick={handleDownload}
          disabled={isDownloading || isLoading}
          className="mt-4 rounded-full bg-primary px-9 py-3 text-white disabled:opacity-50 lg:mt-0"
        >
          {isDownloading || isLoading ? "Downloading..." : "Download as CSV"}
        </button>
      </div>
    </div>
  );
};

export default OverviewTabs;
