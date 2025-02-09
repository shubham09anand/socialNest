import React, { useState } from 'react';
import MakeComment from '../Post/MakeComment';
import API from '../../Services/API';
import AllStoryOfAUser from '../Setting/AccountHistory/All_Story_Of_A_User';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServerError from "../Animation/ServerError";
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import DeltePost from './DeltePost';
import LikeAndComment from './LikeAndComment';
import PostAniamtion from "../Animation/PostAniamtion";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SearchedPersonPost = () => {

     const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
     const [commentSection, setCommentSection] = useState(null);
     const [page, setPage] = useState(1);
     const { searchedUserId } = useParams();

     const fetchSearchedPost = async () => {
          const response = await API.post('/searchedPerosnPost', { userId: searchedUserId, page: page })
          return response.data;
     }

     const { data: PostDetails, isLoading, isError } = useQuery({
          queryFn: fetchSearchedPost,
          queryKey: ['searchedPost', searchedUserId, page],
          enabled: !!searchedUserId && !!page,
          staleTime: Infinity
     })

     return (
          <div className="w-full max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r">

               {searchedUserId === likedBy && <AllStoryOfAUser />}

               {isError && (<ServerError width={60} height={32} paddingTop={10} />)}

               {isLoading && (<PostAniamtion />)}

               {PostDetails?.Post?.length === 0 ? (
                    <div className="text-center mt-4 text-gray-500">
                         <div className='w-fit h-fit rounded-full mb-2 p-3 border-2 border-black mx-auto'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=".7" stroke="black" className="size-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                              </svg>
                         </div>
                         No posts available this user.
                    </div>
               ) : (
                    PostDetails?.Post?.map((post, index) => (
                         <div key={index} className={`${(post?.postPhoto.length === 0 && index === commentSection) ? 'h-96' : '' } border-b-2 p-2 w-full bg-white text-sm font-medium border-1 mx-auto shadow-sm relative`}>
                              <div className='flex justify-between place-content-center items-center'>
                                   <PostHeader PostDetails={PostDetails} post={post} />
                                   <DeltePost likedBy={likedBy} post={post} index={index} />
                              </div>

                              <PostContent post={post} />

                              <LikeAndComment commentSection={commentSection} setCommentSection={setCommentSection} post={post} index={index} likedBy={likedBy} />

                              {index === commentSection &&
                                   <MakeComment index={index} setCommentSection={setCommentSection} commentSection={commentSection} postId={post._id} />
                              }
                         </div>
                    ))
               )}

               <div className="flex justify-center mt-4 pb-4">
                    {Array.from({ length: Math.ceil(PostDetails?.totalPosts / 2) }, (_, index) => (
                         <button key={index + 1} onClick={() => setPage(index + 1)} className={`text-[10px] mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`} disabled={page === index + 1}>
                              {index + 1}
                         </button>
                    ))}
               </div>
          </div>
     );
};

export default SearchedPersonPost;