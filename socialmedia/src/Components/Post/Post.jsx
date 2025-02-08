import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostAniamtion from '../Animation/PostAniamtion';
import MakeComment from './MakeComment';
import ShowCommentsAndLike from './ShowCommentsAndLike';
import Story from '../Story/Story';
import PostHeader from "./PostHeader"
import { useSelector } from "react-redux";
import { fetchPost } from "./PostFunctoion";
import { useQuery } from "@tanstack/react-query";
import PostLikeSection from './PostLikeSection';
import PostContent from './PostContent';
import ServerError from "../Animation/ServerError"

const Post = () => {

  const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
  const [page, setPage] = useState(1);

  const { data: postDetails, isLoading, isError } = useQuery({
    queryKey: ['postDetails', page],
    queryFn: () => fetchPost(page),
    enabled: !!likedBy,
    staleTime: Infinity,
  });

  return (
    <div className="w-full gap-y-5 max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r mb-20">
      <Story />

      <h2 className="text-2xl sm:text-3xl pl-1 sm:leading-snug tracking-wide font-bold mt-2">Post</h2>

      {postDetails?.Post.length === 0 && (
        <div className="text-center mt-4 text-gray-500">
          No posts available at the moment.
        </div>
      )}

      {isLoading ? (
        [...Array(4)].map((_, index) => (<PostAniamtion key={index} />))
      ) : (
        postDetails?.Post.map((post, index) => (
          <div key={post._id} className="p-2 w-full sm:my-4 bg-white text-sm font-medium mx-auto border-b">
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostLikeSection postId={post._id} postTotalLike={post.likes?.length} postTotalComments={post.comments?.length} likedBy={likedBy} index={index} />
            <MakeComment postId={post._id} />
            <ShowCommentsAndLike comments={post.comments} />
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 pb-4">
        {Array.from({ length: Math.ceil(postDetails?.totalPosts / 2) }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)} className={`text-[10px] mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`} disabled={page === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>

      {isError && <div className='bg-white'><ServerError width={80} height={40} paddingTop={10} /></div>}

    </div>
  );
};

export default Post;
