import Pricing from "@/components/landing/pricing";
import Navbar from "@/components/navbar";

const BuyCredit = () => {
  return (
    <div className="h-[calc(100vh-80px]">
      <Navbar />
      <div className="flex h-full w-full items-center justify-center">
        <Pricing />
      </div>
    </div>
  );
};

export default BuyCredit;
