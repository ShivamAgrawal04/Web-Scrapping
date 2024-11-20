import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Search = ({ onSearchResults }) => {
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!source) {
      toast.error("input is empty");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/vulnerability/?source=${source}`
      );
      if (response.data.success) {
        // Pass the search results to the parent component
        onSearchResults(response.data.data);
      } else {
        setErrorMessage("No results found for this source."); // Handle case where no results found
        onSearchResults([]);
      }
    } catch (error) {
      // console.error("Error fetching data", error);

      if (error.response) {
        console.log("Error response:", error.response);
        if (error.response.status === 404) {
          setErrorMessage("No results found for this source."); // Handle 404
        } else {
          setErrorMessage("An error occurred while fetching data."); // Handle other errors
        }
      } else {
        setErrorMessage("An error occurred. Please try again later."); // Generic error
      }
      onSearchResults([]);
      // console.error("Error fetching data", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center justify-center gap-3 pt-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="size-5 text-green-500" />
        </div>
        <input
          className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
          placeholder="Search"
          value={source} // bind input to state
          onChange={(e) => setSource(e.target.value)} // update the state as the user types
        />
      </div>

      <button
        className="py-2 px-7 bg-gradient-to-r font-semibold from-green-500 to-emerald-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
        type="button"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
    </div>
  );
};

export default Search;
