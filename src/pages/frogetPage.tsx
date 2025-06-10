import { useState } from "react";

import { Loader2 } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMailUnreadOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import CustomToast from "@/components/ui/custom-toast";
import { useForgetMutation } from "@/store/services/auth";

import AuthImg from "../assets/img/auth.svg";
import logo from "../assets/img/logo.svg";

const FrogetPage = () => {
  const [Forget, { isLoading }] = useForgetMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format");

  const validateEmail = () => {
    try {
      emailSchema.parse(email);
      return true;
    } catch {
      return false;
    }
  };

  const handleReset = async () => {
    setEmailError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail()) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const response = await Forget({ email });

    if (response.data) {
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="Reset link sent to your Email"
        />
      ));
      navigate("/login");
    } else if (response.error) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Something went wrong. Try again."
        />
      ));
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen flex-1 items-center justify-center overflow-y-auto bg-white">
        <div className="flex w-full flex-col items-center justify-center p-10">
          <img src={logo} alt="" />
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-2">
            <p className="text-2xl font-bold">FORGOT PASSWORD?</p>
            <p className="text-sm text-gray-500 md:text-base">
              No Worries, We'll send you reset instructions.
            </p>
          </div>

          <form className="flex w-full flex-col items-center">
            <div className="mt-10 flex w-full flex-col gap-5 md:w-1/2">
              <div className="flex h-full w-full items-center gap-2 rounded-3xl bg-[#F0EDFFCC] px-3 py-3.5 transition-shadow duration-500 hover:shadow-md">
                <IoMailUnreadOutline className="ml-2 size-6" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="mr-3 w-full bg-[#F0EDFFCC] outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {emailError && (
                <p className="px-3 text-sm text-red-500">{emailError}</p>
              )}
              {email && !validateEmail() && (
                <p className="px-3 text-sm text-red-500">
                  Please enter a valid email address
                </p>
              )}
              <div className="flex w-full items-center justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}
                  className="w-full cursor-pointer rounded-full bg-[#0F162E] px-5 py-3.5 text-center text-white transition-shadow duration-500 hover:bg-[#0F162E]/80 hover:shadow-xl md:px-10"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      {" "}
                      <Loader2 className="size-6 animate-spin" />
                    </div>
                  ) : (
                    <p>Reset Password</p>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-10 flex w-full items-center justify-center">
              <Link
                to="/login"
                className="ml-1 flex items-center gap-3 hover:font-bold"
              >
                <FaArrowLeftLong />
                Back To Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={AuthImg} alt="" className="h-screen w-full object-cover" />
      </div>
    </div>
  );
};

export default FrogetPage;
