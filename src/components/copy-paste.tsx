import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCopyPasteMutation } from "@/store/services/bulk";

const CopyPaste = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [copyPaste, { isLoading, isSuccess, isError, error }] =
    useCopyPasteMutation();

  const handleSubmit = () => {
    const emailList = text
      .split(/\s|,|;/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    const payload = {
      file_name: "copy_paste_input",
      test_emails: emailList,
    };

    copyPaste(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/records");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex h-full w-full rounded-3xl border-2 border-dashed border-primary p-[14px]"
        rows={11}
        placeholder="Paste email addresses here..."
      ></textarea>

      <div className="flex w-full items-center justify-end">
        <button
          className="mt-5 rounded-full bg-primary px-9 py-3 text-white"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Proceed"}
        </button>
      </div>

      {isError && (
        <p className="text-red-600">
          Error submitting emails: {JSON.stringify(error)}
        </p>
      )}
    </div>
  );
};

export default CopyPaste;
