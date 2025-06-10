import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  useDeleteEmailMutation,
  useRecordListQuery,
} from "@/store/services/bulk";

import Image from "../../assets/img/g1.svg";
import CustomToast from "../ui/custom-toast";
import WarningModal from "../warning-modal";

const recordsPerPage = 7;

const RecordList = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const [warn, setWarn] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: records, isLoading } = useRecordListQuery(
    {},
    { pollingInterval: 3000 }
  );
  const [deleteEmail, { isLoading: isDeleting }] = useDeleteEmailMutation();
  const navigate = useNavigate();

  const filteredRecords = records?.filter((record) =>
    record.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((filteredRecords?.length || 0) / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords?.slice(startIndex, endIndex);

  const startItem = startIndex + 1;
  const endItem = Math.min(endIndex, filteredRecords?.length ?? 0);
  const totalItems = filteredRecords?.length ?? 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteEmail(id);
    if (response.error) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Failed to delete file!"
        />
      ));
    } else {
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="Successfully deleted file!"
        />
      ));
    }
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            i === currentPage ? "bg-primary text-white" : "hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="h-full w-full">
      <WarningModal
        open={warn}
        loading={isDeleting}
        setOpen={setWarn}
        message="Are you sure you want to delete?"
        cta={async () => {
          await handleDelete(selected);
          setWarn(false);
        }}
      />

      <div className="h-[calc(100vh-315px)] overflow-x-auto">
        <table className="w-full min-w-[768px] table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">File Name</th>
              <th className="p-4 text-center">Deliverable</th>
              <th className="p-4 text-center">Total Emails</th>
              <th className="p-4 text-center">Status</th>
              <th className="flex justify-end p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex h-[calc(100vh-286px)] w-full items-center justify-center">
                    <Loader2 className="size-16 animate-spin text-primary" />
                  </div>
                </td>
              </tr>
            ) : currentRecords?.length ? (
              currentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b-[10px] border-gray-100 bg-white hover:bg-gray-50"
                >
                  <td className="w-1/4 px-4 py-2">
                    <div className="flex items-center gap-2 truncate">
                      <img src={Image} alt="" className="size-6" />
                      {record.file_name}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <p className="font-semibold">
                      {record.deliverable} <br />
                      <span className="text-sm font-normal">
                        {record.status}
                      </span>
                    </p>
                  </td>
                  <td className="px-4 py-2 text-center font-semibold">
                    {record.total_emails}
                  </td>
                  <td className="px-4 py-2">
                    <div
                      className={cn(
                        "w-full rounded-full px-4 py-2 text-center text-sm font-semibold text-white",
                        record.status === "in-progress"
                          ? "bg-primary"
                          : record.status === "Completed"
                            ? "bg-[#3ED299]"
                            : "bg-primary"
                      )}
                    >
                      {record.status}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="flex items-center gap-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-primary"
                        onClick={() => navigate(`/overview/${record.id}`)}
                      >
                        View <ChevronRight size={16} />
                      </button>
                      <button
                        disabled={isDeleting && selected === record.id}
                        onClick={() => {
                          setSelected(record.id);
                          setWarn(true);
                        }}
                      >
                        {isDeleting && selected === record.id ? (
                          <Loader2 className="size-full animate-spin" />
                        ) : (
                          <Trash2 className="size-full text-red-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="flex h-[250px] flex-col items-center justify-center gap-2 md:h-[600px]">
                    <TriangleAlert className="size-14 text-destructive" />
                    <p className="text-gray-500">No Records found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex w-full items-center justify-between p-2">
        <span className="text-sm">
          Showing{" "}
          <span className="font-semibold">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="font-semibold">{totalItems}</span> Records
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 bg-gray-100 p-2.5 text-primary hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1 rounded-xl border border-gray-300 bg-gray-100 text-primary">
            {renderPagination()}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-xl border border-gray-300 bg-gray-100 p-2.5 text-primary hover:bg-primary hover:text-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordList;
