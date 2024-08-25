// src/components/Dashboard.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full fixed top-0 left-0">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <nav className="mt-6">
            <ul>
              <li>
                <Link
                  to="/qr-creater"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
                >
                  Create QR code
                </Link>
              </li>
              <li>
                <Link
                  to="/qr-scanner"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
                >
                  Obtain QR code
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="flex items-center justify-between bg-white shadow-md p-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log out
          </button>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Card Example */}
            <Link
              to="/qr-creater"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Create QR code
              </h2>
            </Link>
            <Link
              to="/qr-scanner"
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Obtain QR code
              </h2>
            </Link>
            <Link to="/signup" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">SignUp</h2>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
