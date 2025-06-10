import success from "../assets/images/success.png";

const SuccessModal = () => {
  return (
    <div className="absolute inset-0 flex h-screen items-center justify-center bg-black/60">
      <div className="rounded-4xl flex h-[40%] w-[30%] flex-col items-center justify-center bg-white">
        <div className="rounded-full bg-[#3D6BD8] p-5">
          <img src={success} alt="" />
        </div>
        <p className="mt-5 text-3xl font-bold">Subscribed Successfully</p>
        <p className="mt-5 text-gray-400">
          <span className="font-medium text-[#3D6BD8]">5000 Credit</span> added
          to your account
        </p>
        <p className="text-gray-400">you can start Validation Now!</p>
        <button className="mt-5 rounded-full bg-[#3D6BD8] px-9 py-3 text-white">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
