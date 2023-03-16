import logo from "../assets/imgs/logo.png";
import Login from "../components/Login";
import { useLocation, Navigate } from "react-router-dom";
import Register from "../components/Register";
import AuthBg from "../components/AuthBg";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Auth = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const data = location.state?.data;
  const message = location.state?.message;
  if (user) return <Navigate to="/" replace />;
  return (
    <AuthBg>
      <div className=" flex-1 z-10 my-auto">
        <div className="flex bg-logo_bg rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 ">
            <img
              src={logo}
              alt="logo"
              className="relative w-full h-full object-cover"
            />
          </div>
          <div className="w-full p-5 lg:w-1/2 bg-slate-700/80">
            <h2 className="text-5xl font-rampart text-blue text-center m-3">
              Socialize
            </h2>
            {data === "login" ? <Login message={message} /> : <Register />}
          </div>
        </div>
      </div>
    </AuthBg>
  );
};

export default Auth;
