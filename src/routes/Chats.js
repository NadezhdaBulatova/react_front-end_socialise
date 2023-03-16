import { useContext, useEffect, useState } from "react";
import ProfileContext from "../contexts/ProfileContext";
import AuthContext from "../contexts/AuthContext";
import MainBg from "../components/MainBg";
import useAxios from "../utils/useAxios";
import { getProfileById } from "../utils/API_URLs";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";

const Chats = () => {
  const [friendsProfiles, setFriendsProfiles] = useState([]);
  const api = useAxios();
  const { userProfile, fetchTicket, setTicket } = useContext(ProfileContext);
  const friends = userProfile?.friends;
  const navigate = useNavigate();
  const [activeConv, setActiveConv] = useState();
  useEffect(() => {
    const getFriendProfile = async (id) => {
      const response = await api.get(getProfileById(id));
      if (response.status === 200) {
        setFriendsProfiles((prev) => [...prev, response.data]);
      }
    };
    if (friends && friends.length > 0) friends.forEach(getFriendProfile);
  }, [friends]);

  return (
    <MainBg>
      <div className="box-border min-h-screen p-3 flex flex-col justify-between items-center">
        <ul className="menu flex-1 bg-base-100 w-56 inline-block rounded-box mb-5 overflow-scroll">
          <li className="menu-title">
            <span className=" text-center text-gray-100 text-4xl">Friends</span>
          </li>
          {friendsProfiles.map((friend, id) => (
            <li
              key={id}
              onClick={() => {
                setTicket(null);
                fetchTicket();
                setActiveConv(id);
              }}
              className={activeConv == id ? "bordered" : ""}
            >
              <div className="avatar flex flex-row">
                <div className="w-16 rounded">
                  <img src={friend.profile_img} alt="" />
                </div>
                <div className="inline-block align-middle">
                  <p>{`${friend.name} ${friend.last_name}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          onClick={() => navigate("/profiles")}
        >
          Add new friend
        </button>
      </div>
      <div className="card flex-1 m-3 rounded-3xl p-3 bg-slate-700/50 flex shadow-xl flex-row justify-evenly">
        {activeConv !== undefined && (
          <Chat
            otherParticipants={[friendsProfiles[activeConv].user.username]}
          />
        )}
      </div>
    </MainBg>
  );
};

export default Chats;
