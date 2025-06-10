import { useState } from "react";

import { Login } from "iconsax-react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@/store";
import { useProfileQuery } from "@/store/services/profile";

import LogoutModal from "../logout-modal";

const LandingNavbar = () => {
  const { data } = useProfileQuery({});
  const userName = `${data?.first_name || "John"}`;
  const { token } = useSelector((state: RootState) => state.global);
  const [isOpen, setIsOpen] = useState(false);
  const [_isOpen, set_IsOpen] = useState(false);

  return (
    <>
      <LogoutModal showLogoutModal={isOpen} setShowLogoutModal={setIsOpen} />
      <nav className="fixed top-0 z-[1] flex h-20 w-full items-center justify-between bg-[#19223F]/80 px-6 backdrop-blur-md md:px-20">
        <a
          href="/"
          className="w-[270px] cursor-pointer text-3xl font-bold text-white"
        >
          Truemail
        </a>

        {/* Desktop Nav */}
        {token ? (
          <div className="hidden gap-8 lg:flex">
            <a href="home" className="text-white hover:text-[#3D6BD8]">
              Home
            </a>
            <a href="records" className="text-white hover:text-[#3D6BD8]">
              Solution
            </a>
            <a href="buy-credit" className="text-white hover:text-[#3D6BD8]">
              Pricing
            </a>
            <a href="helppage" className="text-white hover:text-[#3D6BD8]">
              Company
            </a>
          </div>
        ) : (
          <div className="hidden gap-8 lg:flex">
            <a href="#home" className="text-white hover:text-[#3D6BD8]">
              Home
            </a>
            <a href="#solution" className="text-white hover:text-[#3D6BD8]">
              Solution
            </a>
            <a href="#pricing" className="text-white hover:text-[#3D6BD8]">
              Pricing
            </a>
            <a href="#services" className="text-white hover:text-[#3D6BD8]">
              Company
            </a>
          </div>
        )}

        {/* Desktop Buttons */}
        <div className="hidden gap-4 lg:flex">
          {token ? (
            <button className="rounded-full border border-primary px-6 py-2 text-white hover:bg-primary hover:text-white">
              {userName}
            </button>
          ) : (
            <Link
              to="/signup"
              className="rounded-full border border-primary px-6 py-2 text-primary hover:bg-primary hover:text-white"
            >
              SignUp
            </Link>
          )}

          {token ? (
            <div
              onClick={() => setIsOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-primary bg-primary px-6 py-2 pt-2 text-white hover:bg-[#19223F] hover:text-primary"
            >
              <Login className="size-5 rotate-180 fill-black" variant="Bold" />
              Sign Out
            </div>
          ) : (
            <Link
              to="/signup"
              className="rounded-full border border-primary bg-primary px-6 py-2 text-white hover:bg-[#19223F] hover:text-primary"
            >
              Book a Demo
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => set_IsOpen(!_isOpen)}>
            {_isOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {_isOpen && (
          <div className="absolute left-0 top-20 z-[1] flex w-full flex-col items-center gap-6 bg-[#19223F] py-6 shadow-lg md:items-end md:pr-20 lg:hidden">
            {token ? (
              <div className="flex w-full flex-col items-start justify-center gap-5 px-6">
                <a href="home" className="text-white hover:text-[#3D6BD8]">
                  Home
                </a>
                <a href="records" className="text-white hover:text-[#3D6BD8]">
                  Solution
                </a>
                <a
                  href="buy-credit"
                  className="text-white hover:text-[#3D6BD8]"
                >
                  Pricing
                </a>
                <a href="helppage" className="text-white hover:text-[#3D6BD8]">
                  Company
                </a>
              </div>
            ) : (
              <div className="flex w-full flex-col items-start justify-center gap-5 px-6">
                <a href="#home" className="text-white hover:text-[#3D6BD8]">
                  Home
                </a>
                <a href="#solution" className="text-white hover:text-[#3D6BD8]">
                  Solution
                </a>
                <a href="#pricing" className="text-white hover:text-[#3D6BD8]">
                  Pricing
                </a>
                <a href="#services" className="text-white hover:text-[#3D6BD8]">
                  Company
                </a>
              </div>
            )}

            <div className="flex w-full flex-col items-start gap-4 px-6">
              {token ? (
                <button className="w-full items-center rounded-full border border-primary px-6 py-2 text-white hover:bg-primary hover:text-white">
                  {userName}
                </button>
              ) : (
                <Link
                  to="/signup"
                  className="rounded-full border border-primary px-6 py-2 text-primary hover:bg-primary hover:text-white"
                >
                  SignUp
                </Link>
              )}

              {token ? (
                <div
                  onClick={() => setIsOpen(true)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 py-2 pt-2 text-white hover:bg-[#19223F] hover:text-primary"
                >
                  <Login
                    className="size-5 rotate-180 fill-black"
                    variant="Bold"
                  />
                  Sign Out
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="rounded-full border border-primary bg-primary px-6 py-2 text-white hover:bg-[#19223F] hover:text-primary"
                >
                  Book a Demo
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default LandingNavbar;
