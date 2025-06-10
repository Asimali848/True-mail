import star from "../assets/img/star.svg";
import woman from "../assets/img/women.svg";

const Imagecomp = () => {
  return (
    <div className="rounded-4xl rel hidden rounded-3xl border-2 border-white/50 bg-white/25 pl-10 pr-6 pt-6 backdrop-blur-md md:h-[60.5%] md:w-[50%] lg:block xl:h-[78.5%] xl:w-[70%]">
      <div className="relative flex gap-4">
        <p className="w-[60%] text-2xl font-bold text-white lg:text-6xl">
          Very good works are waiting for you Login Now!!!
        </p>
        <img src={woman} alt="" className="absolute -right-28 top-0" />
      </div>
      <div className="absolute -left-[7%] top-[70%] rounded-full bg-white p-6">
        <img src={star} alt="shine" className="aspect-square w-12" />
      </div>
    </div>
  );
};

export default Imagecomp;
