import Invoice from "../components/invoice";
import Navbar from "../components/navbar";

const Billing = () => {
  return (
    <div className="h-screen bg-[#F5F6F8CC]">
      <Navbar />
      <div className="full p-10">
        <Invoice />
      </div>
    </div>
  );
};

export default Billing;
