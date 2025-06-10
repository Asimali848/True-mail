import { Link } from "react-router-dom";

import Aerow from "../../assets/img/aerow.svg";
import HeroImg from "../../assets/img/hero.svg";

const hero = () => {
  return (
    <div
      id="home"
      className="grid h-full w-full grid-cols-1 bg-[#0F162E] py-10 pt-20 md:grid-cols-2 lg:min-h-screen lg:px-20"
    >
      <div className="items center flex flex-col justify-center gap-8">
        <h1 className="font-faktum md:text-md text-3xl font-bold text-white md:text-6xl">
          The most accurate email verification tool
        </h1>
        <p className="text-sx text-gray-300 lg:text-xl">
          Improve deliverability, stop list decay, and remove bounces by
          verifying your emails. Simply upload a list, and export.
        </p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-4">
            <Link to="/signup">
              <button className="w-fit rounded-full border border-primary bg-primary px-6 py-3 font-light text-white hover:bg-[#19223F] hover:text-primary lg:px-6">
                Get Started Free
              </button>
            </Link>
            <p className="text-xs text-white">Includes 100 free credits</p>
          </div>
          <div>
            <img src={Aerow} alt="" className="duration-300 hover:scale-105" />
            <div className="-rotate-12 pl-12 pt-2">
              <p className="text-center font-gochi text-[16px] leading-[16px] text-white">
                No credit <br />
                card required!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-end md:mb-20 md:mt-0">
        <img src={HeroImg} alt="" className="duration-300 hover:scale-105" />
      </div>
    </div>
  );
};

export default hero;
