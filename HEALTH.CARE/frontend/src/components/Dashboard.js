import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ username }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome, {username}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Select a doctor to request a consultation, <br/> 'nd you can check status below.
        </p>
        {/* <div className="flex justify-center">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            <Link
              to="/doctors"
              className="text-lg text-white hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Choose a Doctor
            </Link> <br/>
            <Link
              to="/status"
              className="text-lg text-white hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Consultation Status
            </Link>
          </button>
        </div> */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4"> Features</h2>
                <ul className="space-y-2">
                    <li className="p-2 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition duration-200"> <Link
                to="/doctors"
              >
                Choose a Doctor
              </Link></li>
                    <li className="p-2 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition duration-200"> <Link
                to="/status"
              >
                Consultation Status
              </Link></li>
                </ul>
            </div>
      </div>
    </div>
  );
};

export default Dashboard;
