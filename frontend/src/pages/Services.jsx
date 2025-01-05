import React from "react";

const Services = () => {
  return (
    <div className=" text-gray-200 py-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-6">Our Services</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Real-Time Vulnerability Monitoring
            </h3>
            <p className="text-gray-400">
              Stay informed with vulnerabilities scraped directly from OEM
              websites and other trusted platforms.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Comprehensive Vulnerability Analysis
            </h3>
            <p className="text-gray-400">
              Get detailed insights into vulnerabilities, including severity
              levels and descriptions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Customizable Dashboards
            </h3>
            <p className="text-gray-400">
              Visualize critical security data with user-friendly and
              interactive dashboards.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Automated Reporting
            </h3>
            <p className="text-gray-400">
              Generate and download detailed vulnerability reports in various
              formats.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Notification Alerts
            </h3>
            <p className="text-gray-400">
              Receive instant alerts about newly discovered critical
              vulnerabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
