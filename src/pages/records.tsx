import { useState } from "react";

import { ChevronDown, Search } from "lucide-react";

import Navbar from "@/components/navbar";
import RecordGrid from "@/components/past-records/record-grid";
import RecordList from "@/components/past-records/record-list";
import SingleEmail from "@/components/single-email";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import GridActive from "../assets/img/gridactive.svg";
import GridInactive from "../assets/img/gridinactive.svg";
import ListActive from "../assets/img/listactive.svg";
import ListInactive from "../assets/img/listinactive.svg";

const Records = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [emailType, setEmailType] = useState<"single" | "bulk">("bulk");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full max-h-screen w-full">
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-start gap-5 bg-gray-100 px-4 py-5 lg:px-16">
        <h1 className="text-5xl font-bold">Past Records</h1>
        <div className="grid w-full gap-5 lg:grid-cols-3">
          <div className="col-span-1"></div>
          <div className="col-span-1 flex w-full rounded-full bg-white pl-3 shadow-md">
            <Search className="mt-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by email name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="on-focus:outline-none w-full rounded-full bg-white py-3 pl-3 focus-visible:outline-none"
            />
          </div>
          <div className="col-span-1 flex items-center justify-end gap-5">
            {emailType === "bulk" && (
              <div className="hidden gap-2 lg:flex">
                <img
                  src={view === "list" ? ListActive : ListInactive}
                  alt="List View"
                  className="size-6 cursor-pointer"
                  onClick={() => setView("list")}
                />
                <img
                  src={view === "grid" ? GridActive : GridInactive}
                  alt="Grid View"
                  className="size-6 cursor-pointer"
                  onClick={() => setView("grid")}
                />
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="w-36 rounded-lg border border-primary bg-white px-2 py-1 text-sm text-primary shadow-sm focus:outline-none">
                <div className="flex items-center justify-between">
                  {emailType === "single" ? "Single Email" : "Bulk Email"}
                  <ChevronDown className="size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setEmailType("bulk")}>
                  Bulk Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEmailType("single")}>
                  Single Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {emailType === "bulk" ? (
          view === "list" ? (
            <RecordList searchQuery={searchQuery} />
          ) : (
            <RecordGrid searchQuery={searchQuery} />
          )
        ) : (
          <div className="h-[calc(100vh-260px)] w-full rounded-2xl bg-white shadow-lg">
            <h1 className="px-8 py-4 text-2xl font-bold">
              Recent Verifications
            </h1>
            <div className="h-[1px] w-full bg-gray-200" />
            <SingleEmail searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
