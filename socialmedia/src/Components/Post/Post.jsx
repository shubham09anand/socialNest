import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LazyLoad from 'react-lazy-load';
import { Carousel } from "@material-tailwind/react";
import PostAniamtion from '../Animation/PostAniamtion';
import MakeComment from './MakeComment';
import ShowCommentsAndLike from './ShowCommentsAndLike';
import Story from '../Story/Story';
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';
import { useSelector } from 'react-redux';
import Deveplores from "../Deveplores";

const Post = () => {
  
  const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
  const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [cachedPosts, setCachedPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async (pageNum) => {
      setIsLoading(true);
      try {
        const res = await API.post('/postDetails', { page: pageNum });
        setCachedPosts((prev) => ({ ...prev, [pageNum]: res.data }));
        setPostDetails(res.data);
        setTotalPage(res.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch posts only if they are not cached
    if (!cachedPosts[page]) {
      fetchPosts(page);
    } else {
      setPostDetails(cachedPosts[page]);
    }
  }, [page, cachedPosts]);

  const handleLike = async (postId) => {
    try {
      const res = await API.post("/giveLike", { postId: postId, likedBy: likedBy });
      return res?.data?.message;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeIncrDcr = async (postId, index) => {
    const status = await handleLike(postId);
    const likeSpan = document.getElementById(index + 'postLike').querySelector('span');
    let currentLikes = parseInt(likeSpan.innerHTML);

    if (status === "Post liked successfully") {
      likeSpan.innerHTML = currentLikes + 1;
    } else if (status === "Like removed successfully") {
      likeSpan.innerHTML = currentLikes - 1;
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-full gap-y-5 max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r mb-20">
      <Story />
      <h2 className="text-2xl sm:text-3xl pl-1 sm:leading-snug tracking-wide font-bold mt-2">Post</h2>

      {isLoading ? (
        [...Array(4)].map((_, index) => (<PostAniamtion key={index} />))
      ) : postDetails?.Post?.length === 0 ? (
        <div className="text-center mt-4 text-gray-500">
          No posts available at the moment.
        </div>
      ) : (
        postDetails?.Post.map((post, index) => (
          <div key={post._id} className="p-2 w-full sm:my-4 bg-white text-sm font-medium mx-auto border-b">
            <div key={post._id} style={{ textDecoration: "none" }} className="flex gap-3 pl-0 p-2.5 text-sm font-medium">
              <Link to={`/searched-person/${post.userId}`} className='rounded-full h-fit w-fit border-[3px] border-black'>
                <img src={postDetails?.Post[index].postMaker?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile" className="w-12 h-12 md:w-14 md:h-14 border-2 border-black rounded-full object-cover" />
              </Link>
              <div className="h-fit flex-1 place-content-center items-center">
                <h4 className={`font-semibold text-black ${(post.userSignupInfo?.userName === '@shubham' || post.userSignupInfo?.userName === 'shubham09anand') ? 'text-sm' : 'mt-2 md:text-lg'}`}>
                  {post.userSignupInfo?.firstName} {post.userSignupInfo?.lastName}
                  <div className='w-fit -mt-1 flex place-content-center items-center text-xs font-thin md:text-sm'>
                    <span className='mr-3'>{post.userSignupInfo?.userName}</span>
                  </div>
                  {(post.userSignupInfo?.userName === '@shubham' || post.userSignupInfo?.userName === 'shubham09anand') && (<Deveplores size={3} />)}
                </h4>
              </div>
            </div>

            <div aria-expanded="false">
              {postDetails?.Post[index]?.postPhoto.length > 0 &&
                <div className="relative w-full sm:px-4 p-1">
                  {postDetails?.Post[index]?.postPhoto.length > 1 ? (
                    <Carousel>
                      {postDetails?.Post[index]?.postPhoto.map((pic, position) => (
                        <LazyLoad className='flex' key={position}>
                          <img src={pic || postImagErr} onError={(e) => e.target.src = postImagErr} alt="Post" className='sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md' />
                        </LazyLoad>
                      ))}
                    </Carousel>
                  ) : (
                    <LazyLoad className='flex'>
                      <img src={postDetails?.Post[index]?.postPhoto[0] || postImagErr} onError={(e) => e.target.src = postImagErr} alt="Post" className='sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md' />
                    </LazyLoad>
                  )}
                </div>
              }
              {post.message &&
                <div className={'overflow-scroll example my-2 rounded-xl max-h-20 overflow-y-scroll ' + (postDetails?.Post[index]?.postPhoto.length !== 0 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl font-extrabold')}>
                  {post.message}
                </div>
              }
              <div className='flex justify-between place-content-center items-center'>
                <div className="text-xs pt-1 text-gray-800">
                  {moment(post.createdAt).format('D MMMM YYYY')}, {moment(post.createdAt).format('h:mm A')}
                </div>
              </div>
            </div>

            <div className='flex gap-x-5 pl-0 my-1'>
              {post.postTags && post.postTags.map((tag, index) => (
                <div key={index} className='font-extrabold text-xs sm:text-normal font-mono p-1 px-2 rounded-full border border-gray-100 mt-2'>{tag}</div>
              ))}
            </div>

            <div className='flex space-x-5'>
              <div id={index + 'postLike'} className="sm:p-2 flex items-center gap-4 text-xs font-semibold">
                <div onClick={() => { handleLikeIncrDcr(post._id, index) }}>
                  <div className="flex items-center gap-2.5 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <span>{post.likes?.length}</span>
                  </div>
                </div>
              </div>
              <div className="sm:p-2 items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-3 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  <span>{post.comments?.length}</span>
                </div>
              </div>
            </div>
            <MakeComment postId={post._id} />
            <ShowCommentsAndLike comments={post.comments} />
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 pb-4">
        {Array.from({ length: totalPage }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Post;
