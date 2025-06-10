import { useState } from "react";

import { Loader2 } from "lucide-react";
import { AiTwotoneLock } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMailUnreadOutline } from "react-icons/io5";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import CustomToast from "@/components/ui/custom-toast";
import {
  useLazyFacebookLoginQuery,
  useLoginMutation,
} from "@/store/services/auth";
import { useLazyGoogleLoginQuery } from "@/store/services/auth";

import AuthImg from "../assets/img/auth.svg";
import logo from "../assets/img/logo.svg";

const SignupPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGoogleLogin, { isLoading: isGoogleLoading }] =
    useLazyGoogleLoginQuery();
  const [triggerFacebookLogin, { isLoading: isFacebookLoading }] =
    useLazyFacebookLoginQuery();

  const navigate = useNavigate();
  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleLogin = async () => {
    let hasError = false;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail()) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    const response = await login({ email, password });

    if (response.data) {
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="Login Successfully"
        />
      ));
      navigate("/home");
    } else if (response.error) {
      console.log(response.error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          //@ts-ignore
          description={response.error?.data?.detail}
        />
      ));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await triggerGoogleLogin({});

      if (response?.data?.url) {
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Redirecting"
            description="Redirecting to Google for login..."
          />
        ));

        window.location.href = response.data.url;
      } else if (response.data?.success) {
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Success"
            description="Logged in with Google"
          />
        ));

        navigate("/login");
      } else if (response.error) {
        console.log(response.error);
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            // @ts-ignore
            description={"Failed to login with Google"}
          />
        ));
      }
    } catch (error) {
      console.error(error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Something went wrong with Google login"
        />
      ));
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const res = await triggerFacebookLogin({}).unwrap();

      if (res?.url) {
        window.location.href = res.url;
      } else {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Failed to start FaceBook login"
          />
        ));
      }
    } catch (error) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Something went wrong with FaceBook login"
        />
      ));
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen flex-1 items-start justify-center overflow-y-auto bg-white">
        <div className="flex w-full flex-col items-center justify-center p-10">
          <img
            src={logo}
            alt=""
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <div className="mt-7 flex flex-col items-center justify-center gap-2">
            <p className="text-2xl font-bold">LOGIN</p>
            <p className="text-sm text-gray-500 md:text-base">
              Please enter your informaton to access you'r account
            </p>
          </div>
          <div className="mt-6 flex w-full flex-col items-center gap-4 lg:w-[50%]">
            <div className="flex w-full gap-4 md:w-1/2 md:flex-col lg:w-full">
              <button
                onClick={handleGoogleLogin}
                className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-3xl border border-gray-200 px-2 py-3.5 transition-shadow duration-500 hover:shadow-lg md:px-3"
              >
                {isGoogleLoading ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FcGoogle className="size-6" />
                    <p className="hidden w-44 text-center text-sm md:block">
                      Login with <span className="font-bold">Google</span>
                    </p>
                  </div>
                )}
              </button>

              <button
                onClick={handleFacebookLogin}
                className="flex w-full cursor-pointer items-center justify-center gap-5 rounded-3xl border border-gray-200 px-2 py-3.5 transition-shadow duration-500 hover:shadow-lg md:px-3"
              >
                {isFacebookLoading ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FaFacebook className="size-6 text-blue-500" />
                    <p className="hidden w-44 text-center text-sm md:block">
                      Login with <span className="font-bold">Facebook</span>
                    </p>
                  </div>
                )}
              </button>
            </div>

            <fieldset className="mb-5 mt-5 w-full border-t border-gray-300 text-center">
              <legend className="px-2 text-[15px]">
                <span className="font-bold">Login</span> with Others
              </legend>
            </fieldset>

            <form className="flex w-full flex-col gap-4">
              <div className="flex h-full w-full items-center gap-2 rounded-3xl bg-[#F0EDFFCC] px-3 py-3.5 transition-shadow duration-500 hover:shadow-md">
                <IoMailUnreadOutline className="ml-2 size-6" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="mr-3 w-full bg-transparent outline-none"
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
              <div className="flex h-full w-full items-center gap-2 rounded-3xl bg-[#F0EDFFCC] px-3 py-3.5 transition-shadow duration-500 hover:shadow-md">
                <AiTwotoneLock className="ml-2 size-6" />
                <div className="flex w-full items-center">
                  <input
                    type={eye ? "password" : "text"}
                    placeholder="Enter Password"
                    className="w-full bg-[#F0EDFFCC] outline-none"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    required
                  />
                  <div onClick={() => setEye(!eye)}>
                    {eye ? (
                      <RiEyeLine className="ml-2 mr-2 text-2xl" />
                    ) : (
                      <RiEyeOffLine className="ml-2 mr-2 text-2xl" />
                    )}
                  </div>
                </div>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}

              <div className="flex items-end justify-end">
                <a
                  href="/forgot"
                  className="md:ml-70 ml-40 font-semibold text-blue-400"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                  className="mt-5 w-full cursor-pointer rounded-full bg-[#0F162E] px-5 py-3.5 text-center text-white transition-shadow duration-500 hover:bg-[#0F162E]/80 hover:shadow-xl md:px-10"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="size-6 animate-spin text-white" />
                    </div>
                  ) : (
                    <span>LOGIN</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 md:mt-6">
            <p className="text-gray-500">
              Already have an account?
              <Link to="/signup" className="ml-1 font-bold text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img src={AuthImg} alt="" className="h-screen w-full object-cover" />
      </div>
    </div>
  );
};

export default SignupPage;
