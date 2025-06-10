import { Upload } from "lucide-react";

const TestEmail = () => {
  return (
    <div className="grid gap-4 bg-white px-4 py-10 lg:grid-cols-2 lg:px-20">
      <div className="flex flex-col items-start justify-center gap-4">
        <h1 className="text-2xl font-bold lg:text-4xl">
          Test the Email Validator
        </h1>
        <p className="text-xs text-[#5C6584]">
          Truemail delivers industry-leading bulk email verification with 99%
          accuracy. Input an email address directly into our verification tool
          or upload a file to validate an entire list of email addresses.
        </p>
        <p className="text-xs text-[#5C6584]">
          Within seconds, Truemail identifies invalid, risky, or inactive
          addresses using advanced real-time validation technology. Experience
          unmatched precision, efficiency, and reliability to ensure your
          campaigns reach genuine recipients and maintain sender reputation.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-gray-100 p-10">
        <button className="flex w-full items-center justify-center gap-2 rounded-full border bg-[#0F162E] py-2 text-white duration-300 hover:border-[#0F162E] hover:bg-white hover:text-[#0F162E] hover:drop-shadow-xl">
          <Upload /> Upload Your List
        </button>
        <div className="w-4/5">
          <fieldset className="flex w-full border-t-2 border-gray-300 text-center">
            <legend className="px-5">or</legend>
          </fieldset>
        </div>
        <div className="flex w-full gap-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="email@example.com"
            className="w-full rounded-full border bg-white px-6 py-2 duration-300 placeholder:text-xs hover:drop-shadow-lg focus:border-primary focus:outline-none focus:ring-0"
          />
          <button className="rounded-full border border-primary bg-primary px-8 py-2 text-xs text-white hover:bg-gray-100 hover:text-primary">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestEmail;
