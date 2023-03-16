import MainBg from "../components/MainBg";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import ProfileCardBig from "../components/ProfileCardBig";
import { useLocation } from "react-router-dom";
import ProfileCardBigChange from "../components/ProfileCardBigChange";
import ProfileContext from "../contexts/ProfileContext";
import PostCard from "../components/PostCard";
import CreateNewPost from "../components/CreateNewPost";
import useAxios from "../utils/useAxios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPostsLink } from "../utils/API_URLs";

const Home = () => {
  const location = useLocation();
  const data = location.state?.data;
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(ProfileContext);

  const api = useAxios();
  const [posts, setPosts] = useState([]);
  const [postsInfo, setPostsInfo] = useState();

  const fetchPosts = async () => {
    const response = await api.get(getPostsLink(user.user_id));
    if (response.status === 200) {
      setPostsInfo(response.data);
      setPosts(response.data.results);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNextFetch = async () => {
    const response = await api.get(postsInfo.next);
    if (response.status === 200) {
      setPostsInfo(response.data);
      setPosts((prev) => [...prev, ...response.data.results]);
    }
  };

  if (userProfile)
    return (
      <MainBg>
        {data ? (
          <ProfileCardBigChange />
        ) : (
          <ProfileCardBig
            profile_img={userProfile.profile_img}
            name={userProfile.name}
            last_name={userProfile.last_name}
            username={user.username}
            status={userProfile.status}
            location={userProfile.location}
            bio={userProfile.bio}
            ableAlter={true}
            id={user.user_id}
          />
        )}
        <div className="card bg-slate-700/50 shadow-xl m-3 flex-1 flex-row flex-wrap justify-evenly ">
          {posts.length === 0 && (
            <h1 className="my-auto mx-auto text-4xl">
              You do not have any posts
            </h1>
          )}
          {postsInfo && posts && (
            <InfiniteScroll
              className="flex-1 flex flex-row flex-wrap justify-evenly"
              dataLength={postsInfo.count}
              next={handleNextFetch}
              hasMore={postsInfo.next}
              height={400}
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
          <CreateNewPost
            fetchPosts={() => {
              fetchPosts();
              window.location.reload(false);
            }}
          />
        </div>
      </MainBg>
    );
};

export default Home;
