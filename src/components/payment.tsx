import HBL from "../assets/img/aerow.svg";
import strpe from "../assets/img/aerow.svg";
import visa from "../assets/img/aerow.svg";
import cardtick from "../assets/img/card-tick.svg";

const Payment = () => {
  return (
    <div className="flex h-full w-full gap-5 pt-20">
      <div className="mb-10 flex w-full flex-col gap-3">
        <div className="h-full rounded-2xl bg-white px-10 py-5">
          <p className="text-2xl font-semibold">Billing address</p>
          <p className="text-sm text-gray-400">
            Please make sure your billing address matches the one your bank has
            on file.
          </p>
          <div className="mt- grid grid-cols-2 gap-16">
            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">Full Name</p>
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 p-3 outline-none"
                placeholder="Enter you'r name"
              />
            </div>
            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">Last name</p>
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 p-3 outline-none"
                placeholder="Enter you'r Last name"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 mt-3 text-lg font-semibold">Address</p>
            <input
              type="text"
              className="w-full rounded-full bg-gray-100 p-3 outline-none"
              placeholder="Enter you'r Address"
            />
          </div>
          <div className="w-full">
            <p className="mb-2 mt-3 text-lg font-semibold">City</p>
            <input
              type="text"
              className="w-full rounded-full bg-gray-100 p-3 outline-none"
              placeholder="Enter you'r City name"
            />
          </div>
          <div className="grid grid-cols-3 gap-16">
            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">Country</p>
              <div className="flex w-full rounded-full bg-gray-100 p-3">
                <select name="" id="" className="w-2/2 outline-none">
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option value="1">Pakistan</option>
                  <option value="1">Pakistan</option>
                  <option value="1">Pakistan</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">Status</p>
              <div className="flex w-full rounded-full bg-gray-100 p-3">
                <select name="" id="" className="w-full outline-none">
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">Zip</p>
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 p-3 outline-none"
                placeholder="Enter you'r Zip Code"
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white px-10 py-5">
          <p className="text-2xl font-semibold">Payment</p>
          <div className="grid grid-cols-2 gap-16">
            <div className="w-full">
              <div className="mb-2 mt-3 flex items-center justify-start gap-2">
                <p className="text-lg font-semibold">Name on card</p>
                <p className="text-[12px] text-gray-400">
                  Full name as displayed on card
                </p>
              </div>
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 p-3 outline-none"
                placeholder="Rehan Siddique"
              />
            </div>
            <div className="w-full">
              <p className="mb-2 mt-3 text-lg font-semibold">
                {" "}
                Credit card number{" "}
              </p>
              <div className="flex w-full items-center justify-between rounded-full bg-gray-100 p-3">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="1234 1234 1234 1234"
                />
                <div className="flex gap-2">
                  <img src={visa} alt="" />
                  <img src={strpe} alt="" />
                  <img src={HBL} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid w-[60%] grid-cols-2 gap-16">
            <div className="w-full">
              <p className="mb-2 text-lg font-semibold">Expiration</p>
              <input
                type="text"
                className="w-full rounded-full bg-gray-100 p-3 outline-none"
                placeholder="10/25"
              />
            </div>
            <div className="w-full">
              <p className="mb-2 text-lg font-semibold">Credit card number</p>
              <div className="flex w-full items-center justify-between rounded-full bg-gray-100 p-3 focus:border focus:border-gray-500">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="1234 1234 1234 1234"
                />
                <img src={cardtick} alt="" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-gray cursor-pointer rounded-full border border-gray-300 bg-gray-300 px-5 py-2 hover:border-gray-500 hover:bg-white hover:text-black">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="mb-10 flex w-[30%] flex-col justify-between rounded-2xl bg-white p-5">
        <div>
          <p>Number of Credits</p>
          <p className="mb-5 text-4xl font-bold">5,000</p>
          <p className="text-xl font-semibold text-black">$0.0076</p>
          <p className="text-gray-500">Cost Per Credit</p>
          <p className="mt-6">Price shown in USD</p>
        </div>
        <div>
          <div className="flex justify-between">
            <p>5,000 credits</p>
            <p>$38</p>
          </div>
          <fieldset className="mt-2 h-0.5 w-full rounded-full bg-[#648BE6]"></fieldset>
          <div className="mt-2 flex justify-between">
            <p>Tolal</p>
            <p className="font-bold">$38</p>
          </div>
          <div className="mt-5 w-full">
            <button className="w-full cursor-pointer rounded-full border bg-[#0F162E] px-5 py-4 text-white hover:border hover:bg-white hover:text-black">
              Confirm Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
