import MainBg from "../components/MainBg";
import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { getProfilesExceptOwn, searchProfiles } from "../utils/API_URLs";
import ProfileCardSmall from "../components/ProfileCardSmall";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Profiles.css";
import { Formik } from "formik";
import ProfileContext from "../contexts/ProfileContext";

const Profiles = () => {
  const [profilesSetInfo, setProfilesSetInfo] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const api = useAxios();
  const { userProfile } = useContext(ProfileContext);

  const fetchProfilesInfo = async () => {
    const response = await api.get(getProfilesExceptOwn);
    if (response.status === 200) {
      setProfilesSetInfo(response.data);
      setProfiles([...response.data.results]);
    }
  };

  const fetchProfilesBySearch = async (query) => {
    const response = await api.get(searchProfiles(query));
    if (response.status === 200) {
      setProfilesSetInfo(response.data);
      setProfiles([...response.data.results]);
    }
  };

  const handleNextFetch = async () => {
    const response = await api.get(profilesSetInfo.next);
    if (response.status === 200) {
      setProfilesSetInfo(response.data);
      setProfiles((prev) => [...prev, ...response.data.results]);
    }
  };

  return (
    <MainBg>
      <div className="flex-1 flex flex-col p-3 justify-center">
        <div className="flex flex-row">
          <Formik initialValues={{ search: "" }}>
            {({ values, handleBlur, setValues }) => (
              <form className="flex-1">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by name, last name or username "
                  className="input input-bordered w-full"
                  onChange={(value) => {
                    setValues({ search: value.currentTarget.value });
                    fetchProfilesBySearch(value.currentTarget.value);
                  }}
                  onBlur={handleBlur}
                  value={values.search}
                />
              </form>
            )}
          </Formik>
          <button
            className="btn btn-xs btn-md ml-5"
            onClick={() => {
              fetchProfilesInfo();
            }}
          >
            Show all
          </button>
        </div>

        <div className=" flex-1 flex-row card bg-slate-700/50 shadow-xl m-3 justify-evenly overflow-scroll max-h-screen">
          {profiles.length === 0 && (
            <h1 className="my-auto mx-auto text-4xl">
              No profiles to display. Please start / amend the search
            </h1>
          )}
          {profilesSetInfo && (
            <InfiniteScroll
              className="flex-1 flex flex-row flex-wrap justify-evenly"
              dataLength={profilesSetInfo.count}
              next={handleNextFetch}
              hasMore={profilesSetInfo.next}
              refreshFunction={() =>
                profiles?.map((profile, ind) => (
                  <ProfileCardSmall
                    background_img={profile.background_img}
                    profile_img={profile.profile_img}
                    name={profile.name}
                    last_name={profile.last_name}
                    username={profile.user.username}
                    id={profile.user.id}
                    key={ind}
                  />
                ))
              }
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
            >
              {profiles &&
                profiles?.map((profile, ind) => (
                  <ProfileCardSmall
                    background_img={profile.background_img}
                    profile_img={profile.profile_img}
                    name={profile.name}
                    last_name={profile.last_name}
                    username={profile.user.username}
                    id={profile.user.id}
                    key={ind}
                  />
                ))}
            </InfiniteScroll>
          )}
        </div>
        <div className="w-56"></div>
      </div>
    </MainBg>
  );
};

export default Profiles;
