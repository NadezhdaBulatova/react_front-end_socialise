import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getToken, registerLink } from "../utils/API_URLs";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let tokens = localStorage.getItem("authTokens");
  let [authTokens, setAuthTokens] = useState(() =>
    tokens ? JSON.parse(tokens) : null
  );
  let [user, setUser] = useState(() => (tokens ? jwt_decode(tokens) : null));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loginUser = async (values) => {
    let response = await fetch(getToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    if (response.status === 200) {
      let data = await response.json();
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something is wrong");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/auth");
  };

  const registerUser = async (values) => {
    let response = await fetch(registerLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.nickname,
        password: values.password,
      }),
    });
    if (response.status === 201) {
      navigate("/auth", {
        state: {
          data: "login",
          message: "Please enter your registration data to login",
        },
      });
    } else {
      alert("Something is wrong");
    }
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  let contextData = {
    user,
    loginUser,
    logoutUser,
    authTokens,
    setAuthTokens,
    setUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
