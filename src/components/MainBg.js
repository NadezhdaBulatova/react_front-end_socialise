import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import ProfileContext from "../contexts/ProfileContext";
import Menu from "./Menu";
import { Navigate } from "react-router-dom";

const MainBg = ({ children, img }) => {
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(ProfileContext);
  if (!img && userProfile) img = userProfile.background_img;
  if (!user) return <Navigate to="/auth" replace />;
  return (
    <div className="relative max-w-screen min-h-screen flex flex-row overflow-visible">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay -z-10"
        src={img}
        alt=""
      />
      {children}
      <Menu />
    </div>
  );
};

export default MainBg;
