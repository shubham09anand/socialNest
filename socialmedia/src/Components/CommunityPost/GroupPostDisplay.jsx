import React, { useEffect, useState } from 'react';
import MakeComment from './MakeComment';
import CreateGroupPost from './CreateGroupPost';
// import PostAniamtion from "../Animation/PostAniamtion";
// import ServerError from "../Animation/ServerError"
import API from "../../Services/API";
import GroupPostContent from './GroupPostContent';
import { useQuery, useMutation, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deletePost, getProfilePic } from './CommunityPostFunction';
import { useSelector } from 'react-redux';

const GroupPostDisplay = ({ groupAdmins, ownerId, expand }) => {

     const { groupId } = useParams();
     const queryClient = useQueryClient();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId)
     const [display, setDisplay] = useState(0);
     const [page, setPage] = useState(1);
     const [selectCommet, setSelectCommet] = useState(null);
     const [deleteOption, setDeleteOption] = useState(null);
     const [postMakerId, setPostMakerId] = useState([]);

     const fetchGroupPost = async (groupId) => {
          if (groupId) {
               const response = await API.post('/fetchGroupPost', { groupId, page });
               return response;
          }
     }

     const { data: post, isError } = useQuery({
          queryKey: ['fetchGroupPost', page],
          queryFn: () => fetchGroupPost(groupId),
          enabled: !!groupId,
          staleTime: Infinity,
     });

     useEffect(() => {
          if (post) {
               post?.data?.post?.forEach((user) => {
                    setPostMakerId((prev) => {
                         if (!prev.includes(user.userId)) {
                              return [...prev, user.userId];
                         }
                         return prev;
                    });
               });
          }
     }, [post, page]);

     const { data: profilePhoto } = useQuery(
          {
               queryKey: (['postProfilePicture', postMakerId]),
               queryFn: ({ queryKey }) => getProfilePic(queryKey[1]),
               enabled: postMakerId.length > 0,
               staleTime: Infinity,
          }
     );

     const { mutate: handleDeletePost } = useMutation({
          mutationKey: (variables) => ['deleteGroupPost', variables?.postId],
          mutationFn: ({ groupId, postId }) => deletePost({ groupId, postId }),
          onSuccess: (data, variables) => {
               console.log(data, variables?.postId);

               const cachedPost = queryClient.getQueryData(['fetchGroupPost', page]);

               if (cachedPost) {
                    const updatedPost = [];
                    cachedPost?.data?.post.forEach((item) => {
                         (item._id !== variables?.postId) && updatedPost.push(item);
                    });
                    queryClient.setQueryData(['fetchGroupPost', page], {
                         ...cachedPost,
                         data: {
                              ...cachedPost.data,
                              post: updatedPost,
                         },
                    });
               }
          },
          onError: (error) => {
               console.error('Error deleting post:', error);
          },
     });

     const isPostDeleting = useIsMutating(['deleteGroupPost'])

     return (
          <>
               {true && (
                    <div className={`${expand ? 'w-0 overflow-hidden' : ''} hidden md:block border-l-2 overflow-y-scroll h-full md:w-1/2 md:h-[780px]`}>
                         <div className='pt-20 pl-4 w-fit h-fit flex space-x-5 place-content-center items-center'>
                              {display === 1 && (
                                   <svg onClick={() => setDisplay(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="black" className="size-5 cursor-pointer hover:opacity-75 active:opacity-50 border-[2px] border-black p-[3px] rounded-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                   </svg>
                              )}
                              <div className='text-2xl font-semibold'>Group Post</div>
                              {display === 0 && (
                                   <svg onClick={() => setDisplay(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6 cursor-pointer hover:opacity-75 active:opacity-50">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   </svg>
                              )}
                         </div>

                         <div className='flex w-full bg-white'>

                              <CreateGroupPost display={display} />

                              {!isError && <div className={`${display === 0 ? 'translate-x-0' : 'translate-x-full'} ${expand ? 'w-0 overflow-hidden' : 'w-1/2'} pb-60 duration-[.5s] absolute right-0 mt-2 border-r overflow-y-scroll md:h-[780px] z-0 border-l-2`}>
                                   {post?.data?.post?.map((items, index) => (
                                        <div key={items?._id || index} className={`bg-white relative ${items?.postPhoto?.length === 0 ? 'h-fit' : 'h-fit'} border-b-2 overflow-hidden bg-white rounded-sm w-full pt-0 mx-auto`}>
                                             {(userId === ownerId || items?.userId === userId || groupAdmins?.includes(userId)) && (
                                                  <div className='ml-auto absolute top-3 right-5'>
                                                       <div onClick={() => deleteOption === null ? setDeleteOption(index) : deleteOption === index ? setDeleteOption(null) : setDeleteOption(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rounded-full cursor-pointer hover:opacity-75 active:opacity-50 shadow-[2px_2px_2px_black] p-1 ">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                            </svg>
                                                       </div>
                                                       <>
                                                            {index === deleteOption && (
                                                                 <button disabled={isPostDeleting} onClick={() => handleDeletePost({ groupId: groupId, postId: items?._id })} className={`border-[1px] border-black shadow-[2px_2px_2px_gray] rounded-md px-2 absolute -top-1 right-10 flex space-x-2 sm:space-x-4 py-1 hover:opacity-75 active:opacity-50 items-center w-fit ${isPostDeleting ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                      </svg>
                                                                      <div className="text-sm font-medium sm:text-base">Remove</div>
                                                                 </button>
                                                            )}
                                                       </>

                                                  </div>
                                             )}
                                             <div className="px-4 py-3 h-fit">
                                                  <GroupPostContent items={items} profilePhoto={profilePhoto} />
                                             </div>

                                             {<MakeComment postId={items?._id} setSelectCommet={setSelectCommet} index={index} selectCommet={selectCommet} />}

                                        </div>
                                   ))}
                                   <div className="flex justify-center mt-4 pb-4">
                                        {Array.from({ length: Math.ceil(post?.data?.totalPost / 2) }, (_, index) => (
                                             <button key={index + 1} onClick={() => setPage(index + 1)} className={`mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`} disabled={page === index + 1}>
                                                  {index + 1}
                                             </button>
                                        ))}
                                   </div>
                              </div>}
                              
                         </div>
                    </div>
               )}
          </>
     )
}

export default GroupPostDisplay