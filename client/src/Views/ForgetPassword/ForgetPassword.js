import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import robotIcon from "../../assets/Images/icon.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isMailSent, setIsMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendMail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_API}/user/forgot-password`,
        { email }
      );
      if (response.status === 200) {
        setIsMailSent(true);
        setTimeout(() => navigate("/signin"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl max-w-md w-full transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-8">
          <img
            src={robotIcon}
            alt="Password Reset Icon"
            className="w-24 h-24 bg-white p-2 rounded-full shadow-lg"
          />
        </div>
        <div className="text-center">
          {isMailSent ? (
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Email Sent Successfully
              </h2>
              <p className="text-white mb-6">
                Check your inbox for further instructions. You will be
                redirected to the login page shortly.
              </p>
              <Link to="/signin">
                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300">
                  Proceed to Login
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Reset Your Password
              </h2>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full p-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400"
                  placeholder="Enter your email address"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                onClick={handleSendMail}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
              <div className="text-right mt-4">
                <Link
                  to="/signin"
                  className="text-xs text-white font-bold hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
