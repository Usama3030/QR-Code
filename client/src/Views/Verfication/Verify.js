import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import robotIcon from "../../assets/Images/icon.png";

const Verify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_NODE_API}/user/verify?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User verified successfully") {
          setIsVerified(true);
        }
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl max-w-md w-full transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-8">
          <img
            src={robotIcon}
            alt="Verification Icon"
            className="w-24 h-24 bg-white p-2 rounded-full shadow-lg"
          />
        </div>
        <div className="text-center">
          {isVerified ? (
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Email Verified Successfully!
              </h2>
              <p className="text-white mb-6">
                Your email has been verified. You can now proceed to login and
                explore our platform.
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
                Verifying Your Email...
              </h2>
              <p className="text-gray-300">
                Please wait while we verify your email address.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
