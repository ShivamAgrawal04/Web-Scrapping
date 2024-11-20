import React, { useState } from "react";

const Results = ({ results }) => {
  // Default state is "All" to show all results
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  // Handle change in severity filter
  const handleSeverityChange = (event) => {
    setSelectedSeverity(event.target.value); // Update selected severity
  };

  // Filter results based on selected severity
  const filteredResults =
    selectedSeverity === "All"
      ? results // Show all results if "All" is selected
      : results.filter((result) => result.severity === selectedSeverity); // Filter based on selected severity

  return (
    <div className="results-container flex">
      <div className="results-list flex-1">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-semibold">Search Results</h3>
          {/* Filter Sidebar */}
          <div className="p-4 bg-gray-800 rounded-md w-64">
            <h4 className="text-sm font-semibold mb-4">Filter by Severity</h4>
            <select
              value={selectedSeverity}
              onChange={handleSeverityChange}
              className="w-full p-2 text-sm bg-gray-700 text-white rounded-md"
            >
              <option value="All">All Results</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Render filtered results */}
        <ul className="mt-4 space-y-3">
          {filteredResults.length === 0 ? (
            <p>No results found for the selected severity filter.</p>
          ) : (
            filteredResults.map((result, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-md">
                <p>
                  <strong>Title:</strong>{" "}
                  {result.detailLink ? (
                    <a
                      href={result.detailLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  ) : (
                    "No title"
                  )}
                </p>
                <p>
                  <strong>CVE:</strong> {result.CVE}
                </p>
                <p>
                  <strong>PublishDate:</strong> {result.publishedDate}
                </p>
                {result.updateDate && (
                  <p>
                    <strong>Update Date:</strong> {result.updateDate}
                  </p>
                )}
                {result.documentId && (
                  <p>
                    <strong>Document ID:</strong> {result.documentId}
                  </p>
                )}
                <p>
                  <strong>Severity:</strong> {result.severity}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Results;
