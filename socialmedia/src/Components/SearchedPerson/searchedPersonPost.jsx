import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MakeComment from '../Post/MakeComment';
import ShowCommentsAndLike from '../Post/ShowCommentsAndLike';
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllStoryOfAUser from '../Setting/AccountHistory/All_Story_Of_A_User';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SearchedPersonPost = () => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const { searchedUserId } = useParams();
     const likedBy = useSelector((state) => (state.LoginSlice.loggedUserId));
     const [postDetails, setPostDetails] = useState([]);
     const [delteOption, setDeleteOption] = useState(null);
     // eslint-disable-next-line

     useEffect(() => {
          if (searchedUserId) {
               API
                    .post('/searchedPerosnPost', { userId: searchedUserId })
                    .then((res) => {
                         setPostDetails(res.data.Post || []);
                    })
                    .catch(() => {
                         toast.error("Someting Went Wrong");
                    });
          }
     }, [searchedUserId]);

     const handleLike = async (postId) => {
          try {
               const res = await API.post("/giveLike", { postId: postId, likedBy: likedBy });
               return res?.data?.message;
          } catch (error) {
               console.log(error);
          }
     }

     const deletePost = async (postId, index) => {
          try {
               const res = await API.post("/deletePost", { postId: postId });
               if (res?.data?.deletedCount === 1) {
                    setPostDetails(postDetails.filter((_, i) => i !== index));
                    toast.success("Post has Been Deleted")
               }
               else if (res?.data?.deletedCount === 0) {
                    toast.success("Someting Went Wrong")
               }
          } catch (error) {
               toast.error("Someting Went Wrong")
               console.log(error);
          }
     }

     const handleLikeIncrDcr = async (postId, index) => {
          const status = await handleLike(postId);

          const likeSpan = document.getElementById(index + 'postLike').querySelector('span');
          let currentLikes = parseInt(likeSpan.innerHTML);

          if (status === "Post liked successfully") {
               likeSpan.innerHTML = currentLikes + 1;
          } else if (status === "Like removed successfully") {
               likeSpan.innerHTML = currentLikes - 1;
          }
     }

     const settings = {
          arrows: true,
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
     };

     return (
          <div className="w-full max-h-[200vh] overflow-y-scroll example lg:w-4/5 md:border-r">
               <ToastContainer />
               {searchedUserId === likedBy && <AllStoryOfAUser />}

               {postDetails?.length === 0 ? (
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
                    postDetails?.map((post, index) => (
                         <div key={index} className="p-2 w-full bg-white rounded-lg text-sm font-medium border-1 mx-auto shadow-sm">
                              <div className='flex justify-between place-content-center items-center'>
                                   <div className="flex gap-3 sm:p-4 p-2.5 pl-0 text-sm font-medium">
                                        <img src={postDetails[0]?.postMaker[0].profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="" className="w-9 h-9 rounded-full object-cover border-black" style={{ border: '2px solid' }} />
                                        <div className="flex-1">
                                             <div>
                                                  <div className="text-black">{post?.userSignupInfo[0]?.firstName}{' '} {post?.userSignupInfo[0]?.lastName}</div>
                                             </div>
                                             <div className="text-xs font-semibold text-gray-800">
                                                  {moment(post?.postMaker?.createdAt).format('D MMMM YYYY')}{' '}, {moment(post?.postMaker?.createdAt).format('h:mm A')}
                                             </div>
                                        </div>
                                   </div>
                                   {likedBy === post.userId && (
                                        <div className='flex p-2 relative'>
                                             <div className={`flex absolute w-56 -left-52 -translate-y-1 z-20 bg-white items-center place-content-center space-x-3 pt-.5 pl-0 shadow-[2px_2px_black] rounded-sm ${delteOption === index ? 'block' : 'hidden'}`}>
                                                  <div className='font-semibold text-lg'>Are You Sure</div>
                                                  <svg onClick={() => setDeleteOption(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 cursor-pointer rounded-sm active:bg-red-400 bg-red-600">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                  </svg>
                                                  <svg onClick={() => deletePost(post._id, index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 cursor-pointer rounded-sm active:bg-red-400 bg-green-600">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                  </svg>
                                             </div>
                                             <svg onClick={() => setDeleteOption(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="cursor-pointer size-6 ml-3 p-[3px] bg-[#7190e4] active:bg-[#5c7fe1] rounded-full">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                             </svg>
                                        </div>
                                   )}
                              </div>

                              <div>
                                   {post?.postPhoto.length > 1 &&
                                        <Slider {...settings}>
                                             {post?.postPhoto?.map((src, index) => (

                                                  <div key={index} className="relative w-full lg:h-96 h-full sm:px-4">
                                                       <img src={src || postImagErr} onError={(e) => e.target.src = postImagErr} alt="" className="sm:rounded-lg border-2 border-black w-full h-full object-contain rounded-md" />
                                                  </div>
                                             ))}
                                        </Slider>
                                   }
                                   {post?.postPhoto.length === 1 &&
                                        <>
                                             {post?.postPhoto?.map((src, index) => (

                                                  <div key={index} className="relative w-full lg:h-96 h-full sm:px-4">
                                                       <img src={src || postImagErr} onError={(e) => e.target.src = postImagErr} alt="" className="sm:rounded-lg border-2 border-black w-full h-full object-contain rounded-md" />
                                                  </div>
                                             ))}
                                        </>
                                   }
                                   {post?.message && <div className={'overflow-scroll example my-2 rounded-xl max-h-20 overflow-y-scroll ' + (post?.postPhoto.length !== 0 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl font-extrabold')}>{post.message}</div>}
                              </div>

                              <div className='flex space-x-5'>
                                   <div id={index + 'postLike'} className="sm:p-2 flex items-center gap-4 text-xs font-semibold">
                                        <div onClick={() => { handleLikeIncrDcr(post._id, index) }}>
                                             <div className="flex items-center gap-2.5 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#ff4500" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                  </svg>
                                                  <span>{post.likes?.length}</span>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="sm:p-2 items-center gap-4 text-xs font-semibold">
                                        <div className="flex items-center gap-3 active:opacity-50 select-none lg:hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                             </svg>
                                             <span>{post.comments?.length}</span>
                                        </div>
                                   </div>
                              </div>

                              <ShowCommentsAndLike comments={post?.comments} />
                              <MakeComment postId={post._id} />
                         </div>
                    ))
               )}
          </div>
     );
};

export default SearchedPersonPost;