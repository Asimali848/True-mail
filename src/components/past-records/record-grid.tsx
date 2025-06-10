import { useState } from "react";

import { ChevronLeft, ChevronRight, Trash2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useRecordListQuery } from "@/store/services/bulk";

const itemsPerPage = 10;

const RecordGrid = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allRecords = [], isLoading } = useRecordListQuery({});

  const filteredRecords = allRecords.filter((r) =>
    r.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
            currentPage === i
              ? "bg-primary text-white"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="h-full w-full">
      <div className="grid h-[calc(100dvh-286px)] w-full grid-cols-1 gap-6 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : currentRecords.length ? (
          currentRecords.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-md"
            >
              <button
                onClick={() => console.log("Delete API call needed", card.id)}
                className="absolute right-2 top-2 hidden rounded-full bg-red-100 p-1 hover:bg-red-200 group-hover:block"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>

              <h3 className="text-lg font-semibold">{card.file_name}</h3>

              <div className="relative my-6 h-48 w-48 pl-5">
                <svg className="absolute left-5 top-3 h-full w-full">
                  <circle
                    className="text-[#FECB60]"
                    strokeWidth="30"
                    stroke="currentColor"
                    fill="transparent"
                    r="62"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-[#3ED299]"
                    strokeWidth="30"
                    strokeDasharray="452.4"
                    strokeDashoffset={452.4 - card.deliverable * 4.524}
                    stroke="currentColor"
                    fill="transparent"
                    r="62"
                    cx="80"
                    cy="80"
                  />
                </svg>
                <div className="absolute inset-0 -top-4 left-2 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">
                    {card.deliverable}%
                  </span>
                  <span className="text-sm text-gray-600">Deliverable</span>
                </div>
              </div>

              <button
                className="flex items-center gap-1 rounded-full bg-primary px-10 py-4 text-sm text-white hover:bg-primary/70"
                onClick={() => navigate(`/overview/${card.id}`)}
              >
                View Results <ChevronRight size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-5 flex h-full w-full flex-col items-center justify-center gap-2">
            <TriangleAlert className="size-14 text-destructive" />
            <p className="text-gray-500">No Records found</p>
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between p-2">
        <span className="text-sm">
          Showing&nbsp;
          <span className="font-semibold">
            {totalItems ? startIndex + 1 : 0}-{endIndex}
          </span>
          &nbsp;from <span className="font-semibold">{totalItems}</span> items
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 bg-gray-100 p-2.5 text-primary hover:bg-primary hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex w-fit gap-1 rounded-xl border border-gray-300 bg-gray-100 text-primary">
            {renderPagination()}
          </div>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-gray-300 bg-gray-100 p-2.5 text-primary hover:bg-primary hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordGrid;
