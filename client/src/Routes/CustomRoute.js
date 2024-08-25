import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignIn from "../Views/SignIn/SignIn";
import SignUp from "../Views/SignUp/SignUp";
import Dashboard from "../Views/Dashboard/index";
import Verify from "../Views/Verfication/Verify";
import QRScanner from "../Views/QRreader/index";
import QRCreater from "../Views/QRcreater/index";
import ForgetPassword from "../Views/ForgetPassword/ForgetPassword";
import ResetPassword from "../Views/ResetPassword/ResetPassword";

const RedirectToSignIn = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate("/signin");
  }, [navigate]);

  return null;
};

const CustomRoute = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/qr-creater" element={<QRCreater />} />
          <Route path="*" element={<RedirectToSignIn />} />
        </Routes>
      </Router>
    </div>
  );
};

export default CustomRoute;
