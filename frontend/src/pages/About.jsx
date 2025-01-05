import React from "react";

const About = () => {
  return (
    <div className=" text-gray-200 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
          About Our Tool
        </h1>
        <p className="text-lg text-gray-300 text-center mb-8">
          Welcome to our Vulnerability Tracker! This tool provides a centralized
          platform to monitor and analyze critical and high-severity
          vulnerabilities, empowering organizations to act swiftly and stay
          secure.
        </p>

        <div className="bg-gray-800 p-7 rounded-lg shadow-lg mb-2">
          <h2 className="text-3xl font-semibold text-green-300 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 mb-6">
            We aim to enhance security awareness by delivering up-to-date
            information about vulnerabilities from trusted OEM sources. Our
            mission is to ensure businesses can make informed decisions to
            mitigate potential threats effectively.
          </p>

          <h2 className="text-3xl font-semibold text-green-300 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-4 pl-4">
            <li>
              <span className="text-green-400 font-medium">
                Comprehensive Coverage:
              </span>{" "}
              Vulnerabilities from leading OEMs and platforms.
            </li>
            <li>
              <span className="text-green-400 font-medium">
                Real-Time Updates:
              </span>{" "}
              Stay ahead with instant data scraping and alerts.
            </li>
            <li>
              <span className="text-green-400 font-medium">
                User-Friendly Interface:
              </span>{" "}
              Interactive dashboards and customizable views.
            </li>
          </ul>
        </div>
      </div>

      {/* Gradient Footer Section */}
      <div className="bg-gradient-to-b from-gray-900 to-green-900  py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-300 mb-2">
          Get in Touch
        </h2>
        <p className="text-gray-400">
          Have questions? Contact us at{" "}
          <span className="text-green-400">support@vulnerabilitytool.com</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
