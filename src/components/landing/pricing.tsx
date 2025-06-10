import { useState } from "react";

import { BadgeCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/store";
import { usePaymentMutation } from "@/store/services/payment";

import Line from "../../assets/img/pricing.svg";

const pricingData = [
  { id: 1, price: "$18", credits: "2000", costPerCredit: "$0.009" },
  { id: 2, price: "$38", credits: "5000", costPerCredit: "$0.0076" },
  { id: 3, price: "$75", credits: "10000", costPerCredit: "$0.0075" },
  { id: 4, price: "$175", credits: "25000", costPerCredit: "$0.007" },
];

const BASE_CREDIT_COST = 0.007;

const Pricing = () => {
  const [payment, { isLoading }] = usePaymentMutation();
  const [customCredits, setCustomCredits] = useState<number>(2000);
  const token = useSelector((state: RootState) => state.global.token);

  const navigate = useNavigate();

  const handlePredefinedSelection = (item: (typeof pricingData)[0]) => {
    const numericCredits = parseInt(item.credits, 10);
    setCustomCredits(numericCredits);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setCustomCredits(val);
    }
  };

  const calculatePrice = (credits: number) => {
    return `$${(credits * BASE_CREDIT_COST).toFixed(2)}`;
  };

  const handlePayment = async () => {
    const cardPrice =
      parseFloat(calculatePrice(customCredits).replace("$", "")) * 100;
    const successUrl = `${window.location.origin}/billing`;

    try {
      const response = await payment({
        success_url: successUrl,
        card_price: Math.round(cardPrice),
        credits: customCredits,
      }).unwrap();

      if (response?.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        console.error("No checkout_url in response");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-center gap-4 px-4 py-4 lg:px-20"
    >
      <div className="mt-5 grid w-full lg:grid-cols-2">
        <div className="mx-5 space-y-2 rounded-[40px] bg-white p-10 lg:mx-0 lg:mt-10 lg:rounded-none lg:rounded-l-[40px]">
          <h1 className="text-center text-3xl font-bold">
            How many emails do you have?
          </h1>
          <input
            type="number"
            inputMode="numeric"
            value={customCredits}
            onChange={handleInputChange}
            placeholder="Enter credits"
            className="no-spinner w-full rounded-full bg-gray-100 py-2 text-center outline-none"
          />

          <p className="w-full py-2 text-center">or, select an amount</p>

          {pricingData.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePredefinedSelection(item)}
              className={`w-full rounded-full border py-2 text-center font-bold transition-all duration-200 ${
                parseInt(item.credits) === customCredits
                  ? "border-primary bg-gray-100 text-primary"
                  : "bg-gray-100 text-black"
              }`}
            >
              {item.credits}
              <span className="text-xs font-light"> credits for </span>{" "}
              {item.price}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-2 rounded-[40px] bg-primary p-10 lg:rounded-none lg:rounded-r-[40px] lg:rounded-t-[40px]">
          <h1 className="text-2xl font-bold text-white">
            {calculatePrice(customCredits)}
          </h1>
          <div className="ml-6 flex w-full items-center justify-center gap-10">
            <div>
              <h1 className="text-2xl text-white">{customCredits}</h1>
              <p className="text-gray-300">credits</p>
            </div>
            <img src={Line} alt="" />
            <div>
              <h1 className="text-2xl text-white">
                ${BASE_CREDIT_COST.toFixed(4)}
              </h1>
              <p className="text-gray-300">Cost Per Credit</p>
            </div>
          </div>

          {token ? (
            <button
              className="w-full rounded-full bg-[#0F162E] py-4 text-sm text-white hover:bg-white hover:text-[#0F162E]"
              disabled={customCredits <= 0 || isLoading}
              onClick={handlePayment}
            >
              {isLoading ? "Processing..." : "Buy Credits"}
            </button>
          ) : (
            <button
              disabled={customCredits <= 0 || isLoading}
              className="w-full rounded-full bg-[#0F162E] py-4 text-sm text-white hover:bg-white hover:text-[#0F162E]"
              onClick={() => navigate("/login")}
            >
              Buy Credits
            </button>
          )}

          <p className="text-sm text-gray-300">Includes 250 free credits</p>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-4">
              <BadgeCheck className="fill-white text-primary" />
              <p className="text-sm text-gray-200">No monthly payments.</p>
            </div>
            <div className="flex gap-4">
              <BadgeCheck className="fill-white text-primary" />
              <p className="text-sm text-gray-200">Buy only what you need.</p>
            </div>
            <div className="flex gap-4">
              <BadgeCheck className="fill-white text-primary" />
              <p className="text-sm text-gray-200">Credits never expire.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Pricing;
