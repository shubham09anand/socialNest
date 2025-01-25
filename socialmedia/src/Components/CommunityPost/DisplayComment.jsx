import React, { useEffect, useState } from "react";
import API from "../../Services/API";
import LoadComment from "../Animation/LoadComment";
import Deveplores from "../Deveplores";
import ServerError from "../Animation/ServerError";
import noProfilePicture from '../../Assets/NoProileImage.png';
import { useQuery } from "@tanstack/react-query";
import { getPostComment } from "./CommunityPostFunction";

const DisplayComment = ({ postId, setSelectCommet }) => {

     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];
     const [commenterId, setCommenterId] = useState([]);
     const [page, setPage] = useState(1);

     const { data: comment, isError, isLoading } = useQuery({
          queryKey: ['groupPostComment', postId, page],
          queryFn: () => getPostComment({ postId, page }),
          enabled: !!postId,
          staleTime: Infinity,
     });

     useEffect(() => {
          if (comment) {
               comment?.comment?.forEach((user) => {
                    setCommenterId((prev) => {
                         if (!prev.includes(user.commenterId)) {
                              return [...prev, user.commenterId];
                         }
                         return prev;
                    });
               });
          }
     }, [comment]);

     const getProfilePic = async () => {
          if (Array.isArray(commenterId) && commenterId.length > 0) {
               const response = await API.post('/profilePicture', { userIdArray: commenterId });
               return response.data?.photo;
          }
     }

     const { data: profilePhoto } = useQuery({
          queryKey: ['profilePicture', commenterId],
          queryFn: getProfilePic,
          enabled: !!commenterId.length,
          staleTime: Infinity,
     });

     return (
          <div className="w-full border-t-[1px] rounded-3xl">
               <div className="flex place-content-center items-center w-full space-x-5">
                    <div className="text-xl text-center rounded-t-2xl border-gray-300 py-2 font-semibold mb-2">Comments</div>
                    <svg onClick={() => setSelectCommet(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="cursor-pointer animate-bounce rounded-full size-5 scale-y-[90%]">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                    </svg>
               </div>

               <div className="example pb-32 border-gray-200 border-b-0 font-normal space-y-3 relative h-80 overflow-y-scroll">
                    {(!isError && !isLoading) && comment?.comment?.map((items) => (
                         <div key={items?._id} className=" items-start gap-3 relative pl-2 border-b pb-2">
                              <div className="flex place-content-center items-center w-fit space-x-2">
                                   <a style={{ color: "black", textDecoration: "none" }} href="/searched-person/65f3191584b3dc332a641181">
                                        {profilePhoto?.map((pic) => (
                                             <>
                                                  {items?.commenterId === pic?.userId && (
                                                       <img style={{ border: '1px black solid' }} key={pic._id} src={pic.profilePhoto || noProfilePicture} onError={(e)=> e.target.src = noProfilePicture} alt="Profile" className="w-10 h-10 mt-1 rounded-full object-cover" />
                                                  )}
                                             </>
                                        ))}
                                        {(!profilePhoto || profilePhoto.length === 0) && (
                                             <div className="border-[1px] text-white border-gray-600 text-center pt-.5 object-contain h-8 w-8 rounded-full font-semibold text-lg" style={{ backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)] }}>{items?.userDetails[0]?.firstName?.[0] || "U"}</div>
                                        )}
                                   </a>
                                   <div>
                                        <div className="text-black flex text-sm font-semibold">{items?.userDetails[0]?.firstName} {items?.userDetails[0]?.lastName}</div>
                                        <div className="flex space-x-5">
                                             <div className="text-black text-xs font-extralight -mt-.5">{items?.userDetails[0]?.userName}</div>
                                             {(items?.userDetails[0]?.userName === '@shubham' || items?.userDetails[0]?.userName === 'shubham09anand') && (<Deveplores size={3} />)}
                                        </div>

                                   </div>
                              </div>
                              <p className="pl-10 text-sm sm:text-base max-h-20 overflow-y-scroll">{items?.comment}</p>
                         </div>
                    ))}

                    {isLoading &&
                         <>
                              {[...Array(4)].map((_, index) => (
                                   <div key={index + 1000}>
                                        <LoadComment />
                                   </div>
                              ))}
                         </>
                    }

                    {(!isError && !isLoading) && comment?.comment.length === 0 && (<div className="text-center text-gray-600 py-20">No Comment Yet . . .</div>)}

                    {(isError && !isLoading) && <ServerError width={40} height={20} paddingTop={20} />}

               </div>
               <div className=" w-full -mt-20 absolute z-20 flex justify-center pb-4">
                    {Array.from({ length: Math.ceil(comment?.totalComment / 2) }, (_, index) => (
                         <button key={index + 1} onClick={() => setPage(index + 1)} className={`text-[10px] mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`} disabled={page === index + 1}>
                              {index + 1}
                         </button>
                    ))}
               </div>

          </div>
     );
}

export default DisplayComment;