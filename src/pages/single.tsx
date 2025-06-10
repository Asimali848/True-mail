import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";

const SearchPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex h-full min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-gray-100">
        <Searchbar />
      </div>
    </div>
  );
};

export default SearchPage;
