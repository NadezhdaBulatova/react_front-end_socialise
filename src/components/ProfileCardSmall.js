import { updateProfile } from "../utils/API_URLs";
import useAxios from "../utils/useAxios";
import ProfileContext from "../contexts/ProfileContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCardSmall = ({
  id,
  profile_img,
  name,
  last_name,
  username,
  background_img,
}) => {
  const { userProfile } = useContext(ProfileContext);
  const [friend, setFrined] = useState(userProfile.friends.includes(id));
  const api = useAxios();
  const navigate = useNavigate();

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
    <div className="card w-72 bg-base-100 shadow-xl m-2">
      <figure
        className="px-10 pt-10"
        onClick={() => {
          navigate({
            pathname: "/profile",
            search: `?id=${id}`,
            state: {
              data: {
                message: "hello",
              },
            },
          });
        }}
      >
        <img src={profile_img} alt="" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${name ? name : ""} ${
          last_name ? last_name : ""
        }`}</h2>
        <p>@{username}</p>
        <div className="card-actions">
          {!friend ? (
            <button
              className="btn btn-primary"
              onClick={() => addToFriends(id)}
            >
              Become friends
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => removeFromFriends(id)}
            >
              Remove from friends
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSmall;
