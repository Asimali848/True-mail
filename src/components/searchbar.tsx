import { useState } from "react";

import { IoIosSend } from "react-icons/io";
import { toast } from "sonner";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePostSingle_EmailMutation } from "@/store/services/single";

import EmailForm from "../components/emailForm";
import CustomToast from "./ui/custom-toast";

const Searchbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const [postSingleEmail, { isLoading }] = usePostSingle_EmailMutation();

  const handleEmailClick = () => {
    setIsModalOpen(true);
  };
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleVerifyClick = async () => {
    if (!isValidEmail(email)) return;

    try {
      const response = await postSingleEmail({
        data: { user_tested_email: email },
      }).unwrap();
      setShowEmailForm(true);
      handleEmailClick();
      response &&
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Success"
            description="Email Get successfully"
          />
        ));
    } catch (err) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Error fetching data"
        />
      ));
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerifyClick();
        }}
        className="mx-auto flex h-full w-full flex-col items-center justify-center p-5 lg:w-1/2"
      >
        <span className="w-full text-center text-5xl font-bold">
          Test the Email Validator
        </span>
        <div className="relative mt-8 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-full w-full items-center justify-center rounded-full bg-white p-8 shadow-md focus-visible:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="absolute right-2 top-3 flex gap-2">
            <button
              type="submit"
              disabled={!isValidEmail(email) || isLoading}
              className={`flex items-center justify-center gap-2 rounded-full p-4 px-8 text-lg font-bold ${
                isValidEmail(email)
                  ? "cursor-pointer bg-[#3D6BD8] text-white"
                  : "cursor-not-allowed bg-gray-200 text-[#3D6BD8]"
              }`}
            >
              <p>Verify</p>
              <IoIosSend className="size-6" />
            </button>
          </div>
        </div>
      </form>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-2 sm:min-w-fit">
          <EmailForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Searchbar;
