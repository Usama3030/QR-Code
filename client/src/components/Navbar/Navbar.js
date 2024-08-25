import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    // <nav className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 shadow-md w-full mx-auto rounded-b-lg">
    <nav className="bg-grayTheme-400 text-white px-6 py-4 shadow-md w-full mx-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className=" font-bold sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">
            <Link to="/dashboard">FIRE GUARD PRO</Link>
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 shadow-md"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
