import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Results from "../components/Results";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // Track if a search has been performed
  const [totalVulnerabilities, setTotalVulnerabilities] = useState(0);
  const [criticalVulnerabilities, setCriticalVulnerabilities] = useState(0);
  const [highVulnerabilities, setHighVulnerabilities] = useState(0);

  useEffect(() => {
    // Fetch total vulnerabilities from the backend
    const fetchTotalVulnerabilities = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/vulnerability/total"
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTotalVulnerabilities(data.total); // Assuming the response contains the total count
          setCriticalVulnerabilities(data.critical); // Assuming the response contains the
          setHighVulnerabilities(data.high); // Assuming the response contains the count
        } else {
          console.error("Failed to fetch total vulnerabilities");
        }
      } catch (error) {
        console.error("Error fetching total vulnerabilities:", error);
      }
    };

    fetchTotalVulnerabilities();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
        <div className="my-6 px-7">
          {searchResults.length > 0 ? (
            <Results results={searchResults} /> // Show results if found
          ) : (
            <p>No results found. Please try a different search.</p> // Show message if no results found
          )}
        </div>
      )}

      <div className="my-20 px-7">
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Total Vulnerabilities</h3>
            <p className="text-4xl mt-4 text-green-500">
              {totalVulnerabilities}
            </p>{" "}
            {/* Display real-time data */}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Critical Vulnerabilities</h3>
            <p className="text-4xl mt-4 text-red-500">
              {criticalVulnerabilities}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">High Vulnerabilities</h3>
            <p className="text-4xl mt-4 text-yellow-500">
              {highVulnerabilities}
            </p>
          </div>
        </div>

        {/* Recent Vulnerabilities */}
        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Recent Vulnerabilities</h3>
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-sm font-semibold text-gray-300 px-6 py-4">
                  Date
                </th>
                <th className="text-sm font-semibold text-gray-300 px-6 py-4">
                  OEM
                </th>
                <th className="text-sm font-semibold text-gray-300 px-6 py-4">
                  Severity
                </th>
                <th className="text-sm font-semibold text-gray-300 px-6 py-4">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example Vulnerability Row */}
              <tr className="hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-300">12/15/2024</td>
                <td className="px-6 py-4 text-gray-300">Microsoft</td>
                <td className="px-6 py-4 text-red-500">Critical</td>
                <td className="px-6 py-4 text-gray-300">
                  Buffer overflow vulnerability in Exchange Server.
                </td>
              </tr>
              <tr className="hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-300">12/14/2024</td>
                <td className="px-6 py-4 text-gray-300">Cisco</td>
                <td className="px-6 py-4 text-yellow-500">High</td>
                <td className="px-6 py-4 text-gray-300">
                  Command injection in Cisco routers.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
