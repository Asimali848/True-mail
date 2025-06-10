import Pricing from "./pricing";

const Billing = () => {
  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center gap-4 px-4 py-4 lg:px-20"
    >
      <h1 className="text-4xl font-bold">Flexible Pricing Options</h1>
      <p className="text-gray-500">
        Choose the option that best fits your business needs.
      </p>
      <p className="text-primary">Pay-As-You-Go</p>
      <Pricing />
    </div>
  );
};

export default Billing;
