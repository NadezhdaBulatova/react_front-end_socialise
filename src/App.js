import "./index.css";
import Auth from "./routes/Auth";
import { AuthProvider } from "./contexts/AuthContext";
// import { ProfileContextProvider } from "./contexts/ProfileContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./routes/Chats";
import Profiles from "./routes/Profiles";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import PrivateRoutes from "./routes/PrivateRoutes";
import Translation from "./routes/Translation";
import TravelHistory from "./routes/TravelHistory";

function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
      {/* <ProfileContextProvider> */}
      <Routes>
        <Route element={<Auth />} path="/auth"></Route>
        <Route element={<PrivateRoutes />} path="">
          {/* <Route element={<NotFound />} path="*" />
          <Route element={<Profile />} path="/profile"></Route>
          <Route element={<Chats />} path="/chats"></Route>
          <Route element={<Profiles />} path="/profiles"></Route> */}
          <Route element={<Home />} path="/" />
          <Route element={<Translation />} path="translate" />
          <Route element={<TravelHistory />} path="travel" />
        </Route>
      </Routes>
      {/* </ProfileContextProvider> */}
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
