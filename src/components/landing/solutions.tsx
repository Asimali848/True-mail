import { useState } from "react";

import {
  ArrowRight,
  BadgeCheck,
  MailPlus,
  MailSearch,
  Repeat,
} from "lucide-react";
import { Link } from "react-router-dom";

import AutoSolution from "../../assets/img/automate.svg";
import RealTime from "../../assets/img/realtime.svg";
import SolutionImg from "../../assets/img/solutionimg.svg";

const Solutions = () => {
  const [activeSolution, setActiveSolution] = useState<
    "bulk" | "realTime" | "auto"
  >("bulk");

  const renderContent = () => {
    switch (activeSolution) {
      case "bulk":
        return (
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col items-start justify-start gap-4">
              <h1 className="text-start text-5xl leading-[1] md:leading-[1.3]">
                Clean Your Email List in 3 Easy Steps
              </h1>
              <p className="text-left text-gray-500">
                Ensure your emails reach the inbox every time with our powerful
                verification and cleaning process. Upload any sized list or
                connect to over 85 integrations for seamless cleaning.
              </p>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">Upload your existing list.</p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Download your freshly cleaned list.
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Deliver up to 99.9% of your emails with confidence.
                </p>
              </div>
              <Link to="/signup">
                <button className="mt-6 flex gap-2 rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/80">
                  Try it Free <ArrowRight />
                </button>
              </Link>
            </div>
            <div className="mt-5 flex justify-end lg:mt-0">
              <img
                src={SolutionImg}
                alt=""
                className="duration-300 hover:scale-105"
              />
            </div>
          </div>
        );
      case "realTime":
        return (
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col items-start justify-start gap-4">
              <h1 className="text-start text-5xl leading-[1] md:leading-[1.3]">
                Real-Time Email Verification{" "}
              </h1>
              <p className="text-left text-3xl">
                Instant Accuracy at Every Entry
              </p>
              <p className="text-left text-gray-500">
                Validate emails the moment they are entered into your forms.
                Instantly detect typos, fake emails, or disposable addresses ard
                keep your list clean from the start.
              </p>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Integrate with your sign-up or lead capture forms.
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Instantly verify email addresses before submission.
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Block fake or invalid entries and improve lead quality.{" "}
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Boost your sender reputation and inbox delivery.
                </p>
              </div>
              <Link to="/signup">
                <button className="mt-6 flex gap-2 rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/80">
                  Try it Free <ArrowRight />
                </button>
              </Link>
            </div>
            <div className="mt-5 flex justify-end lg:mt-0">
              <img
                src={RealTime}
                alt=""
                className="duration-300 hover:scale-105"
              />
            </div>
          </div>
        );
      case "auto":
        return (
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col items-start justify-start gap-4">
              <h1 className="text-start text-5xl leading-[1] md:leading-[1.3]">
                Automated List Cleaning{" "}
              </h1>
              <p className="text-left text-3xl">
                Keep Your List Clean Continuously{" "}
              </p>
              <p className="text-left text-gray-500">
                Automatically detect invalid, dormant, and obsolete email
                addresses in your list to unsustain its quality over time.
                Schedule regular cleanings to ensure your database is always up
                date.
              </p>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Set up automated list cleaning tasks with ease{" "}
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Detect invalid or problematic emails regularly{" "}
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Remove abandoned addresses from your list{" "}
                </p>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="fill-black text-white" />
                <p className="text-gray-500">
                  Reduce bounce rates and spam complaints{" "}
                </p>
              </div>
              <Link to="/signup">
                <button className="mt-6 flex gap-2 rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/80">
                  Try it Free <ArrowRight />
                </button>
              </Link>
            </div>
            <div className="mt-5 flex justify-end lg:mt-0">
              <img
                src={AutoSolution}
                alt=""
                className="duration-300 hover:scale-105"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="solution" className="flex flex-col gap-6 px-4 py-20 lg:px-20">
      <div className="mb-8 flex w-full justify-center">
        <h1 className="text-xl font-extrabold lg:text-4xl">
          Three Solutions, One Goal.
        </h1>
      </div>
      <div className="flex items-start justify-between gap-6 overflow-x-auto border-b-2 text-center">
        <div
          className={`mx-20 flex shrink-0 cursor-pointer items-center justify-center gap-2 pb-2 ${
            activeSolution === "bulk" ? "border-b-[3px] border-black" : ""
          }`}
          onClick={() => setActiveSolution("bulk")}
        >
          <MailPlus size={32} />
          <p>Bulk Email List Cleaning</p>
        </div>
        <div
          className={`mx-20 flex shrink-0 cursor-pointer items-center justify-center gap-2 pb-2 ${
            activeSolution === "realTime" ? "border-b-[3px] border-black" : ""
          }`}
          onClick={() => setActiveSolution("realTime")}
        >
          <MailSearch size={32} />
          <p>Real-Time Email Verification</p>
        </div>
        <div
          className={`mx-20 flex shrink-0 cursor-pointer items-center justify-center gap-2 pb-2 ${
            activeSolution === "auto" ? "border-b-[3px] border-black" : ""
          }`}
          onClick={() => setActiveSolution("auto")}
        >
          <Repeat size={32} />
          <p>Automated List Cleaning</p>
        </div>
      </div>

      <div className="mt-8 h-full min-h-[400px] text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default Solutions;
