import React, { useEffect, useState } from 'react'
import API from '../../Services/API';
import noProfilePicture from '../../Assets/NoProileImage.png';
import Deveplores from "../Deveplores";
import LoadComment from "../Animation/LoadComment";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const MakeComment = ({ index, commentSection, setCommentSection, postId }) => {

     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];
     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
     const queryClient = useQueryClient();
     const [commenterId, setCommenterId] = useState([]);
     const [comment, setComment] = useState("");
     const [button, setButton] = useState(false)

     const hanldeComments = (e, postId) => {
          e.preventDefault();
          setButton(true)
          API.post("/makeComment", { postId: postId, commenterId: userId, commentBody: comment }).then((req, _) => {
               if (req.data.status === 1) {
                    toast.success("Comment posted successfully!");
                    setComment("");
                    setButton(false);
                    queryClient.invalidateQueries('getPostComments');
               }
          }).catch(() => {
               toast.error("Failed to post comment. Please try again.");
               setButton(false);
          }).finally(() => {
               setButton(false);
          })
     }

     const fetchComment = async (postId) => {
          const response = await API.post('/getPostComments', { postId: postId });
          return response?.data;
     }

     const { data: postComment, isLoading, isError } = useQuery({
          queryKey: ['postComment', postId],
          queryFn: () => fetchComment(postId),
          enabled: !!postId,
          staleTime: Infinity,
     });

     useEffect(() => {
          postComment?.comments?.forEach((post, _) => {
               setCommenterId((prev) => {
                    return prev.includes(post?.commenterId) ? prev : [...prev, post?.commenterId]
               })
          })
     }, [postComment])

     const getProfilePic = async () => {
          if (Array.isArray(commenterId) && commenterId.length > 0) {
               const response = await API.post('/profilePicture', { userIdArray: commenterId });
               return response.data?.photo;
          }
     }

     const { data: commeterProfilePhoto } = useQuery({
          queryKey: ['commentProfilePicture', commenterId],
          queryFn: getProfilePic,
          enabled: !!commenterId.length,
          staleTime: Infinity,
     });

     return (
          <>
               <ToastContainer />
               {index === commentSection && (
                    <>
                         {(!isError && !isLoading) && (
                              <div className='absolute bg-white w-full h-80 overflow-y-scroll example -bottom-1 z-20 border-[1px] border-b-0 rounded-t-3xl shadow-[.5px_.5px_.5px_gray] left-0'>
                                   <div className='mb-2 mx-auto w-full border-b-[1px] border-gray-600'>
                                        <div className='w-fit mx-auto flex place-content-center items-center space-x-5 '>
                                             <div className='mt-2 font-semibold mb-2 text-center text-lg mx-auto pb-1 flex place-content-center items-center w-full'>Comments <span className='font-medium ml-2'>{'(' + postComment?.comments?.length + ')'}</span></div>
                                             <svg onClick={() => setCommentSection((null))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 animate-bounce mt-2 cursor-pointer">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                             </svg>
                                        </div>
                                   </div>

                                   <div className="w-full example border-gray-200 font-normal space-y-3 relative h-60  pb-20 overflow-y-scroll">
                                        {postComment?.comments?.map((comment, index) => (
                                             <div key={index} className="pl-2 gap-3 relative">
                                                  <div className="flex w-full space-x-2">
                                                       {!commeterProfilePhoto && (
                                                            <Link to={`/searched-person/${comment?.commenterId}`} className="border-[1px] text-white border-gray-600 text-center pt-[1.5px] h-8 w-8 rounded-full font-semibold text-lg" style={{textDecoration: 'none', backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)] }}>{comment?.commenterProfile?.firstName?.[0] || "U"}</Link>
                                                       )}
                                                       {commeterProfilePhoto?.map((photo, _) => (
                                                            <>
                                                                 {photo?.userId === comment?.commenterId &&
                                                                      <Link style={{ textDecoration: 'none' }} to={`/searched-person/${comment?.commenterId}`}>
                                                                           <img key={index} src={photo?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile" style={{ border: '2px solid black' }} className="h-8 w-8 rounded-full object-cover" />
                                                                      </Link>
                                                                 }
                                                            </>
                                                       ))}
                                                       <div className="text-black flex place-content-center items-center text-sm -mt-1 font-semibold">
                                                            {comment?.commenterProfile?.firstName} {comment?.commenterProfile?.lastName}
                                                            <span className='ml-4'>{(comment?.commenterProfile?.userName === '@shubham' || comment?.commenterProfile?.userName === 'shubham09anand') && (<Deveplores size={3} />)}</span>
                                                       </div>
                                                  </div>
                                                  <p className="pl-10 -mt-1.5 text-sm sm:text-base max-h-20 overflow-y-scroll">{comment?.commentBody}</p>
                                             </div>
                                        ))}
                                        {postComment?.comments?.length === 0 && (<div className='w-full py-10 text-center text-gray-600 text-sm'>No Comments Yet...</div>)}
                                   </div>
                                   <form onSubmit={(e) => hanldeComments(e, postId)} className="bg-white pl-2 absolute bottom-0 w-full sm:py-3 py-2.5 border-t border-gray-100 flex items-center gap-1">
                                        <div className="flex-1 overflow-hidden h-10">
                                             <textarea maxLength={200} required value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Add Comment (max 200 words)" rows="1" className="w-full resize-none  px-4 py-2 focus:bg-gray-200 focus:!border-transparent focus:!ring-transparent bg-gray-200 rounded-2xl outline-none"></textarea>
                                        </div>

                                        <button disabled={button} type="submit" className={`text-sm rounded-full py-1.5 px-3.5 bg-secondery active:opacity-70 ${button ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="#5771b5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                             </svg>
                                        </button>
                                   </form>
                              </div>
                         )}

                         {isLoading &&
                              <div className='absolute pt-3 space-y-6 bg-white w-full h-80 overflow-y-scroll example -bottom-1 z-20 border-[1px] border-b-0 rounded-t-3xl shadow-[.5px_.5px_.5px_gray] left-0'>
                                   {[...Array(5)].map((_, index) => (
                                        <LoadComment key={index} />
                                   ))}
                              </div>
                         }
                    </>
               )}
          </>
     )
}

export default React.memo(MakeComment)