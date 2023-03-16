import { createContext, useState, useEffect, useContext } from "react";
import { getOwnProfileLink, getTicket } from "../utils/API_URLs";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";
import { getProfilesLink } from "../utils/API_URLs";

const ProfileContext = createContext();

export default ProfileContext;

export const ProfileContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [ticket, setTicket] = useState(null);
  const api = useAxios();

  const fetchTicket = async () => {
    let response = await api.get(getTicket, {
      headers: { "Ticket-Header": "chat-ticket" },
    });
    if (response.status === 200) {
      setTicket(response.data.ticket_uuid);
    }
  };
  const fetchUserProfile = async () => {
    try {
      const response = await api.get(getOwnProfileLink(user.user_id));
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    } catch (error) {
      const response = await api.post(getProfilesLink, {
        user: user.user_id,
      });
      if (response.status === 201) {
        setUserProfile(response.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchTicket();
    }
  }, []);

  let contextData = {
    userProfile,
    ticket,
    setTicket,
    fetchTicket,
    fetchUserProfile,
  };
  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
