import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ProfileContext from "../contexts/ProfileContext";
import useAxios from "../utils/useAxios";
import { updateProfile } from "../utils/API_URLs";

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
  const navigate = useNavigate();
  const { userProfile } = useContext(ProfileContext);
  const [friend, setFrined] = useState(userProfile?.friends.includes(id));
  const api = useAxios();

  const addToFriends = async (id_to_add) => {
    const response = await api.patch(
      updateProfile(userProfile.user.id),
      {
        friends: [...userProfile.friends, id_to_add],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setFrined(true);
    }
  };
  const removeFromFriends = async (id_to_remove) => {
    const newFriends = userProfile.friends.filter(
      (friend) => friend !== id_to_remove
    );
    const response = await api.patch(
      updateProfile(userProfile.user.id),
      {
        friends: [...newFriends],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setFrined(false);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-3">
      <figure className="px-10 pt-10">
        <img src={profile_img} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${name ? name : ""} ${
          last_name ? last_name : ""
        }`}</h2>
        <p>@{username}</p>
        <p>{`${status ? status : ""}`}</p>
        <p>{`${location ? location : ""}`}</p>
        <div tabIndex={0} className="collapse group">
          <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            Bio
          </div>
          <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
            <p>{`${bio ? bio : ""}`}</p>
          </div>
        </div>
        {ableAlter && (
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/", {
                state: {
                  data: "change_profile",
                },
              })
            }
          >
            Change profile
          </button>
        )}
        {!ableAlter && !friend && userProfile && (
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
        )}
      </div>
    </div>
  );
};

export default ProfileCardBig;
