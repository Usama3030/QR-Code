import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newUserIcon from "../../assets/Images/add-user.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!user.name.trim()) errors.name = "Name is required";
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(user.email)) {
      errors.email = "Invalid email format";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    } else if (user.password.length > 10) {
      errors.password = "Password cannot exceed 10 characters";
    }
    if (!user.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (user.cpassword !== user.password) {
      errors.cpassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_API}/user/signup`,
          user
        );
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        if (error.response) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email:
              error.response.status === 400
                ? error.response.data.message
                : "An error occurred, please try again later",
          }));
        } else {
          console.error("Error creating user:", error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-grayTheme-900 to-grayTheme-600 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center mb-8">
          <img src={newUserIcon} alt="New User" className="h-10 w-10 mr-3" />
          <h2 className="text-2xl font-bold text-gray-700">
            Create an Account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="John Doe"
              />
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="john.doe@example.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="********"
              />
              {formErrors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-bold text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={user.cpassword}
                onChange={handleChange}
                className={`mt-1 w-full px-3 py-2 border ${
                  formErrors.cpassword ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="********"
              />
              {formErrors.cpassword && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.cpassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-signinButton-200 text-white active:bg-signinButton-300 font-bold rounded-md shadow  focus:outline-none focus:ring-2 focus:ring-signinButton-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
