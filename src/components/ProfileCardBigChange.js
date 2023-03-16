import { useContext, useState } from "react";
import ProfileContext from "../contexts/ProfileContext";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { updateProfile } from "../utils/API_URLs";

const ProfileCardBigChange = () => {
  const api = useAxios();
  const { userProfile, fetchUserProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newBgImg, setNewBgImg] = useState(null);
  const [bgImgChanged, setBgImgChanged] = useState(false);

  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const [name, setName] = useState(userProfile.name);
  const [nameChanged, setNameChanged] = useState(false);
  const [lastName, setLastName] = useState(userProfile.last_name);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [status, setStatus] = useState(userProfile.status);
  const [statusChanged, setStatusChanged] = useState(false);
  const [bio, setBio] = useState(userProfile.bio);
  const [biochanged, setBioChanged] = useState(false);
  const [location, setLocation] = useState(userProfile.location);
  const [locationChanged, setLocationChanged] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();

    if (bgImgChanged) {
      data.append("background_img", newBgImg);
    }
    if (avatarChanged) {
      data.append("profile_img", newAvatar);
    }

    if (nameChanged) data.append("name", name);
    if (lastNameChanged) data.append("last_name", lastName);
    if (statusChanged) data.append("status", status);
    if (biochanged) data.append("bio", bio);
    if (locationChanged) data.append("location", location);

    const response = await api.patch(updateProfile(user.user_id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const handleBgImgChange = async (event) => {
    event.preventDefault();
    await setNewBgImg(event.target.files[0]);
    setBgImgChanged(true);
  };

  const handleAvatarChange = async (event) => {
    event.preventDefault();
    await setNewAvatar(event.target.files[0]);
    setAvatarChanged(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameChanged(true);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameChanged(true);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusChanged(true);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
    setBioChanged(true);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setLocationChanged(true);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-3">
      <figure className="px-10 pt-10">
        <img src={userProfile.profile_img} alt="" className="rounded-xl" />
      </figure>

      <form className="flex flex-col items-center mt-2">
        <div>Background image</div>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mx-auto my-1"
          onChange={handleBgImgChange}
        />
        <span>Avatar image</span>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mx-auto my-1"
          onChange={handleAvatarChange}
        />

        <input
          type="text"
          onChange={handleNameChange}
          placeholder="Name"
          className="input input-bordered w-full max-w-xs m-1"
        />

        <input
          type="text"
          onChange={handleLastNameChange}
          placeholder="Last name"
          className="input input-bordered w-full max-w-xs m-1"
        />

        <input
          type="text"
          onChange={handleStatusChange}
          placeholder="Status"
          className="input input-bordered w-full max-w-xs m-1"
        />

        <input
          type="text"
          placeholder="Bio"
          onChange={handleBioChange}
          className="input input-bordered w-full max-w-xs m-1"
        />

        <input
          type="text"
          placeholder="Location"
          onChange={handleLocationChange}
          className="input input-bordered w-full max-w-xs m-1"
        />

        <button
          type="submit"
          className="btn btn-primary m-1"
          onClick={(e) => {
            handleFormSubmit(e);
            fetchUserProfile();
            navigate("/");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default ProfileCardBigChange;
