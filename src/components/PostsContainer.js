import React from "react";
import { useGetPostsQuery } from "../store/services/api";
import { useAuth } from "../utils/hooks/useAuth";
import PostCard from "./PostCard";
const test_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const PostsContainer = (id) => {
  const { user } = useAuth();
  const { data, error, isFetching, isLoading } = useGetPostsQuery(user.id, {
    pollingInterval: 1000 * 60 * 4,
  });
  if (data) console.log(data.results);
  return (
    // <div className="card bg-slate-700/50 shadow-xl flex-1 flex-row flex-wrap rounded-lg ml-2 overflow-scroll h-full">
    // <div className="w-full h-full overflow-scroll bg-slate-700/50 ml-2 shadow-xl rounded-lg flex flex-row flex-wrap bg-yellow-300">
    <div className="bg-base-300/40 flex flex-row flex-1 flex-wrap overflow-scroll ">
      {data &&
        // data.results.map((post, id) => (
        test_data.map((post, id) => (
          <div className=" p-2 w-80 h-56 bg-red-700"> Div</div>
        ))}
    </div>
  );
};

export default PostsContainer;
// <PostCard
//   key={id}
//   img={post.image}
//   content={post.text_content}
//   time={post.created_at}
// />
