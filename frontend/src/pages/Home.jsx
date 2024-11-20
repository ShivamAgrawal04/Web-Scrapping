import React, { useState } from "react";
import Search from "../components/Search";
import Results from "../components/Results";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Track if a search has been performed

  // This function will receive the search results from the Search component
  const handleSearchResults = (results) => {
    setSearchResults(results); // Set the search results
    setIsSearched(true); // Mark that a search has been performed
  };

  return (
    <div>
      <div className="cards">
        <Search onSearchResults={handleSearchResults} />
      </div>

      {/* Only render the results section after the user performs a search */}
      {isSearched && (
        <div className="my-6 px-5">
          {searchResults.length > 0 ? (
            <Results results={searchResults} /> // Show results if found
          ) : (
            <p>No results found. Please try a different search.</p> // Show message if no results found
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
