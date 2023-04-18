import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import ProfileContext from "../contexts/ProfileContext";
import useAxios from "../utils/useAxios";
import { updateProfile } from "../utils/API_URLs";
import ColorPicker from "./ColorPicker";

const ProfileCardBig = ({
  id,
  profile_img,
  name,
  last_name,
  username,
  status,
  location,
  bio,
  ableAlter,
}) => {
  const [altering, setAltering] = useState(false);
  const [showAdditionalAccountData, setShowAdditionalAccountData] =
    useState(false);
  const [modalAvatarChange, setModalAvatarChange] = useState(false);
  const [alteringFirstName, setAlteringFirstName] = useState(name ? name : "");
  const [alteringLastName, setAlteringLastName] = useState(
    last_name ? last_name : ""
  );

  const fileInput = useRef(null);
  const handleAvatarUpload = () => {
    console.log("avatar upload");
  };
  // const nameToDisplay = ableAlter
  //   ? `${alteringFirstName} ${alteringLastName}`
  //   : `${name ? name : ""} ${last_name ? last_name : ""}`;
  const nameToDisplay = `${name ? name : ""} ${last_name ? last_name : ""}`;

  // const navigate = useNavigate();
  // const { userProfile } = useContext(ProfileContext);
  // const [friend, setFrined] = useState(userProfile?.friends.includes(id));
  // const api = useAxios();

  // const addToFriends = async (id_to_add) => {
  //   const response = await api.patch(
  //     updateProfile(userProfile.user.id),
  //     {
  //       friends: [...userProfile.friends, id_to_add],
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     setFrined(true);
  //   }
  // };
  // const removeFromFriends = async (id_to_remove) => {
  //   const newFriends = userProfile.friends.filter(
  //     (friend) => friend !== id_to_remove
  //   );
  //   const response = await api.patch(
  //     updateProfile(userProfile.user.id),
  //     {
  //       friends: [...newFriends],
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     setFrined(false);
  //   }
  // };

  return (
    <div className="card w-full md:w-1/4 lg:w-1/5 bg-base-100 shadow-xl items-center flex-row md:flex-col md:p-2 overflow-scroll mr-1 md:mr-2 h-40 lg:h-full rounded">
      <div className="md:w-full h-full md:h-fit w-1/3 md:p-3 md:border border-neutral-content md:rounded">
        <div
          className="w-full lg:h-64 md:h-48 md:rounded h-28"
          style={{
            backgroundImage: `url(${profile_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => {
            if (altering) fileInput.current.click();
          }}
          onMouseEnter={() => {
            if (!altering) setShowAdditionalAccountData(true);
          }}
          onMouseLeave={() => {
            if (!altering) setShowAdditionalAccountData(false);
          }}
        >
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            onChange={handleAvatarUpload}
          />
          {showAdditionalAccountData && (
            <div className="absolute md:w-full bg-base-100/80 lg:h-64 md:h-48 h-full rounded w-1/3 flex justify-center items-center text-lg">
              <p>@{username}</p>
            </div>
          )}
        </div>
        {ableAlter && (
          <label className="swap swap-rotate absolute top-1 right-1 lg:bg-base-100 lg:p-2 lg:rounded-bl">
            <input
              type="checkbox"
              checked={altering}
              onChange={() => setAltering((prev) => !prev)}
            />
            <svg
              className="swap-off fill-current w-8 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
            <svg
              className="swap-on fill-current w-8 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        )}
        {!altering && (
          <div className="w-full h-fit md:mt-1 md:rounded text-xs text-center p-2 bg-slate-700 italic">{`${
            status ? status : ""
          }`}</div>
        )}
        {altering && (
          <textarea
            type="text"
            placeholder="Type here"
            value={status ? status : ""}
            maxLength={300}
            className="textarea textarea-bordered w-full max-w-xs text-xs md:mt-1 bg-slate-700 italic h-10 rounded-none md:rounded flex-none resize-none"
          />
        )}
      </div>

      <div className="card-body items-center text-center md:w-full w-2/3 h-full md:h-fit ">
        {!altering && (
          <h2 className="card-title text-lg text-neutral-content">
            {nameToDisplay}
          </h2>
        )}
        {altering && (
          <div className="flex flex-row w-full">
            <input
              type="text"
              placeholder="First name"
              value={alteringFirstName}
              className="input input-bordered w-1/2 max-w-xs mx-1"
              onChange={() => console.log("changing first name")}
            />
            <input
              type="text"
              placeholder="Last name"
              value={alteringLastName}
              className="input input-bordered w-1/2 max-w-xs mx-1"
              onChange={(event) => setAlteringLastName(event.target.value)}
            />
          </div>
        )}
        {!altering && (
          <div className=" bg-red-800 flex flex-1 w-full h-full p-3 text-xs">{`${
            bio ? bio : ""
          }`}</div>
        )}
        {altering && (
          <textarea
            type="text"
            placeholder="Type here"
            value={status ? status : ""}
            maxLength={300}
            className="textarea textarea-bordered w-full max-w-xs text-xs md:mt-1 bg-slate-700 italic h-10 rounded-none md:rounded flex-none resize-none"
          />
        )}
        {/* <div className="chat chat-start w-full">
          <div className="chat-bubble text-sm w-full">{`${
            status ? status : ""
          }`}</div>
        </div> */}
        {/* <div className="alert shadow-lg">
          <div className="w-full">
            <p className="text-center text-xs"> You have 1 unread message</p>
          </div>
        </div> */}
        {/* <div className="collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content rounded peer-checked:rounded-none peer-checked:rounded-t p-0 flex items-center ">
            <p className="text-center text-sm">Bio</p>
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content rounded-b text-xs">
            <p>{`${bio ? bio : ""}`}</p>
          </div>
        </div> */}
        {/* <div tabIndex={0} className="collapse group">
          <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            Bio
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>{`${bio ? bio : ""}`}</p>
          </div>
        </div> */}
        {/* {!ableAlter && !friend && userProfile && (
          <button className="btn btn-primary" onClick={() => addToFriends(id)}>
            Become friends
          </button>
        )}
        {!ableAlter && friend && userProfile && (
          <button
            className="btn btn-secondary"
            onClick={() => removeFromFriends(id)}
          >
            Remove from friends
          </button>
        )} */}
        <p className="text-xs mt-2 ">{`${location ? location : ""}`}</p>
      </div>
    </div>
  );
};

export default ProfileCardBig;
