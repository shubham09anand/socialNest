import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostAniamtion from '../Animation/PostAniamtion';
import MakeComment from './MakeComment';
import Story from '../Story/Story';
import PostHeader from "./PostHeader"
import { useSelector } from "react-redux";
import { fetchPost } from "./PostFunction";
import { useQuery } from "@tanstack/react-query";
import PostLikeSection from './PostLikeSection';
import PostContent from './PostContent';
import ServerError from "../Animation/ServerError";
import API from '../../Services/API';

const Post = () => {

  const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
  const [commentSection, setCommentSection] = useState(null);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState([]);

  const { data: postDetails, isLoading, isError } = useQuery({
    queryKey: ['postDetails', page],
    queryFn: () => fetchPost(page),
    enabled: !!likedBy,
    staleTime: Infinity,
  });

  useEffect(() => {
    postDetails?.Post.forEach((id) => {
      setUserId((prev) => {
        return prev.includes(id.userId) ? prev : [...prev, id.userId];
      })
    })
  }, [postDetails])

  const getProfilePic = async () => {
    if (Array.isArray(userId) && userId.length > 0) {
      const response = await API.post('/profilePicture', { userIdArray: userId });
      return response.data?.photo;
    }
  }

  const { data: profilePhoto } = useQuery({
    queryKey: ['profilePicture', userId],
    queryFn: getProfilePic,
    enabled: !!userId.length,
    staleTime: Infinity,
  });

  return (
    <div className={`w-full gap-y-5 max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r mb-20`}>
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
          <div key={post._id} className={`relative p-2 w-full sm:my-4 bg-white text-sm font-medium mx-auto border-b ${(post?.postPhoto?.length === 0 && commentSection === index ? 'h-96' : '')}`}>
            <PostHeader profilePhoto={profilePhoto} post={post} />

            <PostContent post={post} index={index} />

            <PostLikeSection totalLike={post?.likeCount} index={index} setCommentSection={setCommentSection} postId={post._id} postTotalLike={post.likes?.length} likedBy={likedBy} />

            {index === commentSection &&
              <MakeComment index={index} commentSection={commentSection} setCommentSection={setCommentSection} comments={post.comments} postId={post._id} />
            }

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