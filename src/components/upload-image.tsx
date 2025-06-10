import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { parseFileToJson } from "@/lib/utils";
import { useCopyPasteMutation } from "@/store/services/bulk";

import uploadImage from "../assets/img/upload.svg";
import CustomToast from "./ui/custom-toast";

const UploadFile = () => {
  const navigate = useNavigate();
  const [copyPaste, { isLoading }] = useCopyPasteMutation();
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = async () => {
    if (!file) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Please upload a file to continue."
        />
      ));
    }

    const data = await parseFileToJson(file!);

    const response = await copyPaste({
      file_name: file?.name as string,
      // @ts-ignore
      test_emails: data.content || data.sheets?.Sheet1,
    });

    if (response.data) {
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="File uploaded successfully."
        />
      ));

      navigate("/records");
    } else {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Failed to Upload File."
        />
      ));
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-4">
      <div className="mt-10 flex h-72 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary bg-white p-4 lg:p-16">
        <input
          type="file"
          accept=".csv,.txt,.xls,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {file ? (
            <p className="text-lg font-semibold text-gray-700">
              Selected File: {file?.name}
            </p>
          ) : (
            <div className="cursor-pointer rounded-md p-2 text-gray-500">
              <div className="mb-5 flex items-center justify-center">
                <img src={uploadImage} alt="upload" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold text-[#3D6BD8]/70">
                  Drag and Drop anywhere on the page, or
                  <span className="ml-2 mr-2 text-xl font-semibold text-[#3D6BD8]">
                    click
                  </span>
                  to Upload files.
                </p>
                <p className="text-sm">Supports: CSV, TXT, XLS, or XLSX</p>
              </div>
            </div>
          )}
        </label>
      </div>
      <div className="flex w-full items-center justify-end">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="mt-5 rounded-full bg-primary px-9 py-3 text-white"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default UploadFile;
