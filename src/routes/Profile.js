import MainBg from "../components/MainBg";
import ProfileCardBig from "../components/ProfileCardBig";
import { useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { updateProfile, getPostsLink } from "../utils/API_URLs";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Profile = () => {
  const loc = useLocation();
  const id = loc.search.replace("?id=", "");
  const api = useAxios();
  const [analisedUser, setAnalisedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsInfo, setPostsInfo] = useState();

  useEffect(() => {
    fetchUser();
    fetchPosts(id);
  }, []);

  const fetchUser = async () => {
    const response = await api.get(updateProfile(id));
    if (response.status === 200) {
      const userData = response.data;
      setAnalisedUser({
        id: userData.user.id,
        profile_img: userData.profile_img,
        name: userData.name,
        last_name: userData.last_name,
        location: userData.location,
        bio: userData.bio,
        username: userData.user.username,
        status: userData.status,
        background_img: userData.background_img,
      });
    }
  };
  const fetchPosts = async (id) => {
    const response = await api.get(getPostsLink(id));
    if (response.status === 200) {
      setPostsInfo(response.data);
      setPosts(response.data.results);
    }
  };

  const handleNextFetch = async () => {
    const response = await api.get(postsInfo.next);
    if (response.status === 200) {
      setPostsInfo(response.data);
      setPosts((prev) => [...prev, ...response.data.results]);
    }
  };
  if (analisedUser)
    return (
      <MainBg img={analisedUser.background_img}>
        <ProfileCardBig {...analisedUser} ableAlter={false} />
        <div className=" flex-1 flex-row card bg-slate-700/50 shadow-xl m-3 justify-evenly">
          {posts.length === 0 && (
            <h1 className="my-auto mx-auto text-4xl">
              User does not have any posts
            </h1>
          )}
          {postsInfo && (
            <InfiniteScroll
              className="flex-1 flex flex-row flex-wrap justify-evenly"
              dataLength={postsInfo.count}
              next={handleNextFetch}
              hasMore={postsInfo.next}
              refreshFunction={() =>
                posts?.map((post, ind) => (
                  <PostCard
                    img={post.image}
                    content={post.text_content}
                    key={ind}
                    time={new Date(post.created_at).toDateString()}
                  />
                ))
              }
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
            >
              {posts &&
                posts?.map((post, ind) => (
                  <PostCard
                    img={post.image}
                    content={post.text_content}
                    key={ind}
                    time={new Date(post.created_at).toDateString()}
                  />
                ))}
            </InfiniteScroll>
          )}
        </div>
      </MainBg>
    );
};

export default Profile;
