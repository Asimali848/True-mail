import { useState } from "react";

import { Loader2 } from "lucide-react";
import { AiTwotoneLock } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
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
  useRegisterMutation,
} from "@/store/services/auth";
import { useLazyGoogleLoginQuery } from "@/store/services/auth";

import AuthImg from "../assets/img/auth.svg";
import bgimage from "../assets/img/bglines.svg";
import logo from "../assets/img/logo.svg";

// Zod Schema
const formSchema = z.object({
  username: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(10, "Password is required")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
});

const SignupPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [triggerGoogleLogin, { isLoading: isGoogleLoading }] =
    useLazyGoogleLoginQuery();
  const [triggerFacebookLogin, { isLoading: isFacebookLoading }] =
    useLazyFacebookLoginQuery();
  const navigate = useNavigate();

  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const hasMinLength = password.length >= 10;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const doesNotContainUsername =
    username && !password.toLowerCase().includes(username.toLowerCase());

  const handleSignup = async () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    const result = formSchema.safeParse({ username, email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      if (errors.username) setUsernameError(errors.username[0]);
      if (errors.email) setEmailError(errors.email[0]);
      if (errors.password) setPasswordError(errors.password[0]);
      return;
    }

    const response = await register({
      first_name: username,
      email: email,
      password: password,
    });

    if (response?.data) {
      toast.custom(() => (
        <CustomToast
          type="success"
          title="Success"
          description="Please check your Email"
        />
      ));
      navigate("/login");
    } else {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Something went wrong. Try again."
        />
      ));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await triggerGoogleLogin({}).unwrap();
      if (res?.url) {
        window.location.href = res.url;
      } else {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Failed to start Google login"
          />
        ));
      }
    } catch (error) {
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
        window.location.href = res.url; // Navigate to Google OAuth redirect
      } else {
        toast.custom(() => (
          <CustomToast
            type="error"
            title="Error"
            description="Failed to start Google login"
          />
        ));
      }
    } catch (error) {
      toast.custom(() => (
        <CustomToast
          type="error"
          title="Error"
          description="Something went wrong with Google login"
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
          <div className="mt-3 flex flex-col items-center justify-center gap-2 md:mt-5">
            <p className="text-2xl font-bold">SIGN UP</p>
            <p className="text-sm text-gray-500 md:text-base">
              Signup to get 100 free credits • And unlock exclusive features
            </p>
          </div>
          <div className="mt-6 flex w-full flex-col items-center gap-4 lg:w-[50%]">
            <div className="flex w-full gap-4 md:w-1/2 md:flex-col lg:w-full">
              <button
                onClick={handleGoogleLogin}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-3xl border border-gray-200 px-2 py-3.5 transition-shadow duration-500 hover:shadow-lg md:px-3"
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
                <span className="font-bold">Sign Up</span> with Others
              </legend>
            </fieldset>

            <form className="flex w-full flex-col gap-4">
              <div className="flex h-full w-full items-center gap-2 rounded-3xl bg-[#F0EDFFCC] px-3 py-3.5 transition-shadow duration-500 hover:shadow-md">
                <BsPerson className="ml-2 size-6" />
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="mr-3 w-full bg-[#F0EDFFCC] outline-none"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError("");
                  }}
                  required
                />
              </div>
              {usernameError && (
                <p className="text-sm text-red-500">{usernameError}</p>
              )}

              <div className="flex h-full w-full items-center gap-2 rounded-3xl bg-[#F0EDFFCC] px-3 py-3.5 transition-shadow duration-500 hover:shadow-md">
                <IoMailUnreadOutline className="ml-2 size-6" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="mr-3 w-full bg-[#F0EDFFCC] outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  required
                />
              </div>
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
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

              <div className="mt-3 space-y-2 text-gray-500">
                <div className="flex items-center justify-start gap-2">
                  {hasMinLength ? (
                    <FaCheck className="size-4 text-green-500" />
                  ) : (
                    <BiSolidErrorAlt className="size-4 text-[#3D6BD8]" />
                  )}
                  <p>At least 10 characters long</p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  {hasUpperCase && hasLowerCase && hasNumber && hasSymbol ? (
                    <FaCheck className="size-4 text-green-500" />
                  ) : (
                    <BiSolidErrorAlt className="size-4 text-[#3D6BD8]" />
                  )}
                  <p>
                    Must include at least one uppercase letter, one <br />
                    lowercase letter, one number, and one symbol.
                  </p>
                </div>
                <div className="flex items-center justify-start gap-2">
                  {doesNotContainUsername ? (
                    <FaCheck className="size-4 text-green-500" />
                  ) : (
                    <BiSolidErrorAlt className="size-4 text-[#3D6BD8]" />
                  )}
                  <p>Does not contain user name or full name</p>
                </div>
              </div>

              <p className="text-sm">
                By clicking, you agree to our
                <a
                  href="#"
                  className="ml-1 mr-2 border-b border-blue-500 font-semibold text-blue-600"
                >
                  Privacy Policy
                </a>
                &
                <a
                  href="#"
                  className="ml-2 border-b border-blue-500 font-semibold text-blue-600"
                >
                  Terms of Service.
                </a>
              </p>

              <div className="flex w-full items-center justify-center">
                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  type="button"
                  className="mt-5 w-full cursor-pointer rounded-full bg-[#0F162E] px-5 py-3.5 text-center text-white transition-shadow duration-500 hover:bg-[#0F162E]/80 hover:shadow-xl md:px-10"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="size-6 animate-spin" />
                    </div>
                  ) : (
                    <p>SIGN UP</p>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 md:mt-6">
            <p className="text-gray-500">
              Already have an account?
              <Link to="/login" className="ml-1 font-bold text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative hidden lg:flex"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <img src={AuthImg} alt="" className="h-screen w-full" />
      </div>
    </div>
  );
};

export default SignupPage;
