import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import robotIcon from "../../assets/Images/icon.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value.trim(),
    }));
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.email.trim()) {
      errors.email = "Email is required";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(user);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_API}/user/signin`,
          user
        );
        const { user: userData, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard", { replace: true });
      } catch (err) {
        handleRequestError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRequestError = (error) => {
    if (error.response) {
      const { error: errorMessage } = error.response.data;
      setErrors((prevErrors) => ({
        ...prevErrors,
        request: errorMessage || "An unexpected error occurred",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        request: "Error logging in. Please try again.",
      }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-grayTheme-500">
      <div className="bg-gradient-to-b from-grayTheme-700 to-grayTheme-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center">
          <img src={robotIcon} alt="Robot" className="w-48 mb-8" />
        </div>
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Welcome Back!
        </h2>
        <form className="w-3/5 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-0 bg-white shadow-md">
              <i className="fas fa-user text-gray-500 bg-white ml-2"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={changeHandler}
                className="w-full py-2 px-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="mb-1">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-0 bg-white shadow-md">
              <i className="fas fa-lock text-gray-500 bg-white ml-2"></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={changeHandler}
                className="w-full py-2 px-3 focus:outline-none rounded-lg"
              />
            </div>
          </div>
          {errors.request && <p className="text-red-700">{errors.request}</p>}
          <div className="text-right mb-4">
            <Link
              to="/forget-password"
              className="text-xs text-white font-bold hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-signinButton-200 text-white active:bg-signinButton-300 font-semibold rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
