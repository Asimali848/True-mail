import Vector from "../../assets/img/vector.svg";

const features = [
  "Credit Never Expire",
  "100 free Credits",
  "No Hidden Cost",
  "Detailed Status Codes",
  "24/7 customer support",
  "Volume Pricing",
  "Email Server Testⓘ",
  "Unknown results are free",
  "Free Deduplication Removing",
];

const Included = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-20 lg:px-20">
      <h1 className="text-center text-2xl font-bold lg:text-4xl">
        Included with all Truemail Accounts
      </h1>
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-2">
            <img src={Vector} alt="" className="size-5" />
            <p className="text-sm text-[#5C6584]">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Included;
