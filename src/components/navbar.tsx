import { useState } from "react";

import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ArrangeVerticalCircle,
  CardPos,
  Direct,
  DirectboxSend,
  FtxToken,
  Home2,
  Login,
  MessageQuestion,
  Profile,
  RefreshCircle,
  Xrp,
} from "iconsax-react";
import { Link, NavLink } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileQuery } from "@/store/services/profile";

import Credit from "../assets/img/credit.svg";
import LogoutModal from "./logout-modal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useProfileQuery({});

  return (
    <>
      <LogoutModal showLogoutModal={isOpen} setShowLogoutModal={setIsOpen} />
      <div className="sticky top-0 z-[1] w-full bg-gray-100 shadow-md">
        <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-14">
          {/* Logo */}
          <Link
            to="/"
            className="w-[365px] text-2xl font-bold text-black sm:text-3xl"
          >
            TureMail
          </Link>
          <div className="flex items-center justify-center gap-20">
            <nav className="hidden items-center gap-6 lg:flex">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex w-20 items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <Home2 className="size-5 text-primary" variant="Bold" />
                Home
              </NavLink>
              <NavLink
                to="/bulk"
                className={({ isActive }) =>
                  `flex w-20 items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <DirectboxSend className="size-5 text-primary" variant="Bold" />
                Bulk
              </NavLink>
              <NavLink
                to="/single"
                className={({ isActive }) =>
                  `flex w-20 items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <Direct className="size-4 text-primary" variant="Bold" />
                Single
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden items-center gap-4 lg:flex">
              <NavLink
                to="/buy-credit"
                className="flex items-center justify-center gap-1.5 text-sm font-medium"
              >
                Buy Credits
                <img src={Credit} alt="" />
              </NavLink>
              <span className="text-sm font-semibold">
                {data?.remaining_credits} Credit
              </span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hidden h-14 cursor-pointer items-center justify-center gap-3 rounded-full border bg-white py-1.5 pl-3 pr-1.5 lg:flex">
                    <span>{data?.first_name}</span>
                    <img
                      src="https://ui.shadcn.com/avatars/02.png"
                      alt=""
                      className="size-10 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://ui.shadcn.com/avatars/02.png"
                        alt=""
                        className="size-12 rounded-full"
                      />
                      <h1 className="text-lg">{data?.first_name}</h1>
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <h1 className="text-xs text-gray-500">CREDIT BALANCE</h1>
                      <span className="text-2xl font-extrabold">
                        {data?.remaining_credits}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex flex-col gap-1.5 p-2">
                    <NavLink to="/profile" className="flex items-center gap-2">
                      <Profile className="size-5 fill-black" variant={"Bold"} />
                      Profile
                    </NavLink>
                    <NavLink to="" className="flex items-center gap-2">
                      <ArrangeVerticalCircle
                        className="size-5 fill-black"
                        variant={"Bold"}
                      />
                      Integration
                    </NavLink>
                    <NavLink to="/billing" className="flex items-center gap-2">
                      <CardPos className="size-5 fill-black" variant={"Bold"} />
                      Billing
                    </NavLink>
                    <NavLink to="/records" className="flex items-center gap-2">
                      <RefreshCircle
                        className="size-5 fill-black"
                        variant={"Bold"}
                      />
                      History
                    </NavLink>
                    <NavLink to="/helppage" className="flex items-center gap-2">
                      <MessageQuestion
                        className="size-5 fill-black"
                        variant={"Bold"}
                      />
                      Help
                    </NavLink>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <div
                    onClick={() => setIsOpen(true)}
                    className="flex cursor-pointer items-center gap-2 p-2"
                  >
                    <Login
                      className="size-5 rotate-180 fill-black"
                      variant={"Bold"}
                    />
                    Sign out
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex cursor-pointer items-center lg:hidden"
          >
            <FtxToken className="h-6 w-6 fill-black" variant={"Bold"} />
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-[#E5E5E5] p-6 lg:hidden">
            {/* Close button */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-black">TureMail</h1>
              <button onClick={() => setMobileMenuOpen(false)}>
                <Xrp className="h-6 w-6 fill-black" variant={"Bold"} />
              </button>
            </div>

            {/* User Info */}
            <div className="mt-6 flex items-center gap-4 border-b pb-4">
              <img
                src="https://ui.shadcn.com/avatars/04.png"
                alt=""
                className="size-12 rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold">{data?.first_name}</h1>
                <p className="text-sm text-gray-600">
                  Credits: <strong>{data?.remaining_credits}</strong>
                </p>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="mt-6 flex flex-col gap-4 text-sm font-medium">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <Home2 className="size-5 text-primary" variant="Bold" />
                Home
              </NavLink>
              <NavLink
                to="/bulk"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <DirectboxSend className="size-5 text-primary" variant="Bold" />
                Bulk
              </NavLink>
              <NavLink
                to="/single"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "font-bold" : "font-normal"}`
                }
              >
                <Direct className="size-5 text-primary" variant="Bold" />
                Single
              </NavLink>

              <div className="flex items-center gap-4 lg:flex">
                <NavLink
                  to="/buy-credit"
                  className="flex items-center justify-center gap-1.5 text-sm font-medium"
                >
                  <img src={Credit} alt="" className="size-5" />
                  Buy Credits
                </NavLink>
                <span className="text-sm font-semibold">
                  {data?.remaining_credits} Credit
                </span>
              </div>

              <Separator className="border border-gray-300" />
              <NavLink to="/profile" className="flex items-center gap-2">
                <Profile className="size-5 fill-black" variant="Bold" />
                Profile
              </NavLink>
              <NavLink to="/integration" className="flex items-center gap-2">
                <ArrangeVerticalCircle
                  className="size-5 fill-black"
                  variant="Bold"
                />
                Integration
              </NavLink>
              <NavLink to="/billing" className="flex items-center gap-2">
                <CardPos className="size-5 fill-black" variant="Bold" />
                Billing
              </NavLink>
              <NavLink to="/history" className="flex items-center gap-2">
                <RefreshCircle className="size-5 fill-black" variant="Bold" />
                History
              </NavLink>
              <NavLink to="/help" className="flex items-center gap-2">
                <MessageQuestion className="size-5 fill-black" variant="Bold" />
                Help
              </NavLink>
              <Separator className="border border-gray-300" />
              <div
                onClick={() => setIsOpen(true)}
                className="flex cursor-pointer items-center gap-2 pt-2 text-black"
              >
                <Login
                  className="size-5 rotate-180 fill-black"
                  variant="Bold"
                />
                Sign Out
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
