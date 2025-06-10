import { useState } from "react";

import CopyPaste from "@/components/copy-paste";
import Navbar from "@/components/navbar";
import UplodeTmage from "@/components/upload-image";

import CopyBlue from "../assets/img/copyBlue.svg";
import CopyWhite from "../assets/img/copyWhite.svg";
import PcBlue from "../assets/img/pcBlue.svg";
import PcWhite from "../assets/img/pcWhite.svg";

const Bulk = () => {
  const [selectedSource, setSelectedSource] = useState<"computer" | "copy">(
    "computer"
  );

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="flex h-full min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-gray-100">
        <div className="flex h-full min-h-[calc(100vh-350px)] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 shadow-lg lg:w-2/3">
          <h1 className="text-2xl font-bold">Select a Source</h1>
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
            <button
              className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
                selectedSource === "computer"
                  ? "bg-primary text-white"
                  : "border border-primary bg-primary/20 text-primary"
              }`}
              onClick={() => setSelectedSource("computer")}
            >
              <img
                src={selectedSource === "computer" ? PcWhite : PcBlue}
                alt="pc icon"
              />
              My Computer
            </button>

            <button
              className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
                selectedSource === "copy"
                  ? "bg-primary text-white"
                  : "border border-primary bg-primary/20 text-primary"
              }`}
              onClick={() => setSelectedSource("copy")}
            >
              <img
                src={selectedSource === "copy" ? CopyWhite : CopyBlue}
                alt="copy icon"
              />
              Copy & Paste
            </button>
          </div>

          {selectedSource === "computer" && <UplodeTmage />}
          {selectedSource === "copy" && <CopyPaste />}
        </div>
      </div>
    </div>
  );
};

export default Bulk;
