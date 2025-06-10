import Marquee from "react-fast-marquee";

import Line from "../../assets/img/pricing.svg";
import Service1 from "../../assets/img/service1.svg";
import Service2 from "../../assets/img/service2.svg";
import Service3 from "../../assets/img/service3.svg";
import Service4 from "../../assets/img/service4.svg";
import Service5 from "../../assets/img/service5.svg";
import Service6 from "../../assets/img/service6.svg";
import Service7 from "../../assets/img/service7.svg";

const Services = () => {
  return (
    <div
      id="services"
      className="flex w-full flex-col items-center justify-center gap-8 bg-primary px-4 py-4 lg:px-20 lg:py-12"
    >
      <p className="text-center text-white">
        The No. 1 email validation service for 400,000+ clients
      </p>
      <Marquee autoFill pauseOnHover>
        <div className="flex w-full items-center justify-between">
          <img src={Service1} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service2} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service3} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service4} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service5} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service6} alt="" className="size-10 lg:size-32" />
          <img src={Line} alt="" className="size-10" />
          <img src={Service7} alt="" className="size-10 lg:size-32" />
        </div>
      </Marquee>
    </div>
  );
};

export default Services;
