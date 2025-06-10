import { useEffect } from "react";

import { useDispatch } from "react-redux";

import Navbar from "@/components/navbar";
import Searchbar from "@/components/searchbar";
import UplodeTmage from "@/components/upload-image";
import { setSSO, setToken } from "@/store/slices/global";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      dispatch(setToken(token));
      dispatch(setSSO(true));
    } else {
      dispatch(setSSO(false));
    }
  }, []);

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="3xl:mt-0 flex h-full min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-gray-100">
        <Searchbar />
        <fieldset className="mx-auto mt-10 flex w-1/5 border-t border-gray-300 text-center">
          <legend className="px-5">Or</legend>
        </fieldset>
        <div className="mx-auto flex w-full items-center justify-center rounded-full p-6 lg:w-1/2">
          <UplodeTmage />
        </div>
      </div>
    </div>
  );
};

export default Home;
