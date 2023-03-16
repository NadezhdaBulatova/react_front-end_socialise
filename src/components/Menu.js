import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
const Menu = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="card w-60 bg-base-100 shadow-xl m-3">
      <ul className="menu menu-vertical bg-base-100 rounded-box p-2 flex-1">
        <li className="flex-1 items-center justify-center">
          <a className="flex-1 w-56 justify-center" href="/">
            Home
          </a>
        </li>
        <li className="flex-1 items-center justify-center">
          <a className="flex-1 w-56 justify-center" href="/chats">
            Chats
          </a>
        </li>
        <li className="flex-1 items-center justify-center">
          <a className="flex-1 w-56 justify-center" href="/profiles">
            Profiles
          </a>
        </li>
      </ul>
      {user && (
        <button className="btn btn-accent" onClick={() => logoutUser()}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Menu;
