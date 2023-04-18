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
import { useGetProfileQuery } from "../store/services/api";
import { useAuth } from "../utils/hooks/useAuth";
import { useRefreshTokensMutation } from "../store/services/api";
import { Navigate } from "react-router-dom";
import {
  selectRefreshToken,
  selectAccessTokenExp,
} from "../store/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTokens } from "../store/features/auth/authSlice";
import dayjs from "dayjs";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
  const { user } = useAuth();
  // const dispatch = useDispatch();
  // const refresh_tkn = useSelector(selectRefreshToken);
  // const access_tkn_exp = useSelector(selectAccessTokenExp);
  // const isExpired = dayjs.unix(access_tkn_exp).subtract(1, "minute") < dayjs();
  // const [refresh, { data: refresh_data }] = useRefreshTokensMutation();
  const { data, error, isFetching, isLoading } = useGetProfileQuery(user.id, {
    pollingInterval: 240000,
  });

  console.log(data);
  // useEffect(() => {
  //   console.log("useEffect");
  //   console.log(isExpired);
  //   if (isExpired) {
  //     console.log("refetcing is called");
  //     test();
  //   }
  //   // if (expiration < dayjs()) {
  //   //   console.log("here I am suppposed to update");
  //   //   test();
  //   // }
  // }, [isExpired]);
  // console.log(profile_data);

  // // useEffect(() => {
  // //   if (error && !access_tkn_status) {
  // //     test();
  // //   }
  // // }, [error]);

  // const test = async () => {
  //   console.log("requested data");
  //   const data = await refresh(refresh_tkn).unwrap();
  //   dispatch(setTokens(data));
  //   console.log(data);
  //   // dispatch(setAccessTokenStatus(false));
  // };

  // console.log(data);

  // const location = useLocation();
  // const data = location.state?.data;
  // const { user } = useContext(AuthContext);
  // const { userProfile } = useContext(ProfileContext);

  // const api = useAxios();
  // const [posts, setPosts] = useState([]);
  // const [postsInfo, setPostsInfo] = useState();

  // const fetchPosts = async () => {
  //   const response = await api.get(getPostsLink(user.user_id));
  //   if (response.status === 200) {
  //     setPostsInfo(response.data);
  //     setPosts(response.data.results);
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // const handleNextFetch = async () => {
  //   const response = await api.get(postsInfo.next);
  //   if (response.status === 200) {
  //     setPostsInfo(response.data);
  //     setPosts((prev) => [...prev, ...response.data.results]);
  //   }
  // };

  // if (userProfile)
  //   return (
  //     <MainBg>
  //       {data ? (
  //         <ProfileCardBigChange />
  //       ) : (
  //         <ProfileCardBig
  //           profile_img={userProfile.profile_img}
  //           name={userProfile.name}
  //           last_name={userProfile.last_name}
  //           username={user.username}
  //           status={userProfile.status}
  //           location={userProfile.location}
  //           bio={userProfile.bio}
  //           ableAlter={true}
  //           id={user.user_id}
  //         />
  //       )}
  //       <div className="card bg-slate-700/50 shadow-xl m-3 flex-1 flex-row flex-wrap justify-evenly ">
  //         {posts.length === 0 && (
  //           <h1 className="my-auto mx-auto text-4xl">
  //             You do not have any posts
  //           </h1>
  //         )}
  //         {postsInfo && posts && (
  //           <InfiniteScroll
  //             className="flex-1 flex flex-row flex-wrap justify-evenly"
  //             dataLength={postsInfo.count}
  //             next={handleNextFetch}
  //             hasMore={postsInfo.next}
  //             height={400}
  //             refreshFunction={() =>
  //               posts?.map((post, ind) => (
  //                 <PostCard
  //                   img={post.image}
  //                   content={post.text_content}
  //                   key={ind}
  //                   time={new Date(post.created_at).toDateString()}
  //                 />
  //               ))
  //             }
  //             pullDownToRefresh
  //             pullDownToRefreshThreshold={50}
  //           >
  //             {posts &&
  //               posts?.map((post, ind) => (
  //                 <PostCard
  //                   img={post.image}
  //                   content={post.text_content}
  //                   key={ind}
  //                   time={new Date(post.created_at).toDateString()}
  //                 />
  //               ))}
  //           </InfiniteScroll>
  //         )}
  //         <CreateNewPost
  //           fetchPosts={() => {
  //             fetchPosts();
  //             window.location.reload(false);
  //           }}
  //         />
  //       </div>
  //     </MainBg>
  //   );
  // if (auth.user) {
  return (
    <MainBg>
      {data && (
        <ProfileCardBig
          id={user.id}
          profile_img={data.profile_img}
          name={data.name}
          last_name={data.last_name}
          username={user.username}
          status={data.status}
          location={data.location}
          bio={data.bio}
          ableAlter={true}
        />
      )}
      <PostsContainer />
    </MainBg>
  );
  // } else {
  //   <Navigate to="/auth" />;
  // }
};

export default Home;
