import React, { useEffect, useState } from 'react';
import MakeComment from './MakeComment';
import CreateGroupPost from './CreateGroupPost';
import PostAniamtion from "../Animation/PostAniamtion";
import ServerError from "../Animation/ServerError"
import GroupPostContent from './GroupPostContent';
import { useQuery, useMutation, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deletePost, fetchGroupPost, getProfilePic } from './CommunityPostFunction';
import { useSelector } from 'react-redux';

const GroupPostDisplay = ({ groupAdmins, ownerId, setExpand, expand }) => {

     const { groupId } = useParams();
     const queryClient = useQueryClient();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId)
     const [display, setDisplay] = useState(0);
     const [page, setPage] = useState(1);
     const [warning, setWarning] = useState(false);
     const [selectCommet, setSelectCommet] = useState(null);
     const [deleteOption, setDeleteOption] = useState(null);
     const [postMakerId, setPostMakerId] = useState([]);

     const { data: post, isLoading, isError } = useQuery({
          queryKey: ['fetchGroupPost', groupId, page],
          queryFn: () => fetchGroupPost(groupId, page),
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
          onError: () => {
               setWarning(true);
               setTimeout(() => {
                    setWarning(false);
               }, 5000)
          },
     });

     const isPostDeleting = useIsMutating(['deleteGroupPost']);

     useEffect(()=>{
          post?.data?.post.length === 0 ? setExpand(true) : setExpand(false)
     },[post, setExpand])

     return (
          <div className={`${expand ? 'w-0 overflow-hidden' : 'w-full md:w-1/2'} hidden md:block border-l-2 overflow-y-scroll h-full md:h-[780px]`}>

               {warning && <div className='flex-shrink-0 text-lg text-center font-thin bg-red-600 text-white w-1/2 absolute top-14 z-20 py-2'>Something Went Wrong</div>}

               <div className='pt-16 pl-4 w-fit h-fit flex space-x-5 place-content-center items-center'>
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

                    <CreateGroupPost setWarning={setWarning} display={display} />

                    <div className={`${display === 0 ? 'translate-x-0' : 'translate-x-full'} ${expand ? 'w-0 overflow-hidden' : 'w-1/2'} ${post?.data?.post.length === 0 ? '' : 'overflow-y-scroll'} bg-white pb-60 duration-[.5s] absolute right-0 mt-2 border-r md:h-[780px] z-0 border-l-2`}>

                         {(!isError && !isLoading) &&
                              <div className='w-full h-[clac(100% + 300px)] bg-white pb-20'>
                                   {post?.data?.post?.map((items, index) => (
                                        <div key={items?._id || index} className={`bg-white relative ${(items?.postPhoto?.length === 0 && selectCommet === index) ? 'h-[450px]' : 'h-fit'} border-b-2 overflow-hidden bg-white rounded-sm w-full pt-0 mx-auto`}>
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
                                             <div className="px-4 pt-3 pb-2 h-fit">
                                                  <GroupPostContent items={items} profilePhoto={profilePhoto} />
                                             </div>

                                             {<MakeComment setWarning={setWarning} postId={items?._id} setSelectCommet={setSelectCommet} index={index} selectCommet={selectCommet} />}

                                        </div>
                                   ))}
                                   {(!isError && !isLoading && post?.data?.post.length === 0) && (<div className='w-full h-full md:h-[780px] bg-white'>
                                        <div className="text-center pt-32 text-gray-900">
                                             <div className='w-fit h-fit rounded-full mb-2 p-3 border-2 border-black mx-auto opacity-75'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=".7" stroke="black" className="size-20">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                                  </svg>
                                             </div>
                                             No post at this moment.
                                        </div>
                                   </div>)}
                              </div>
                         }
                         <div className="flex justify-center mt-4 pb-4">
                              {Array.from({ length: Math.ceil(post?.data?.totalPost / 2) }, (_, index) => (
                                   <button key={index + 1} onClick={() => setPage(index + 1)} className={`text-[10px] mx-1 px-2 py-1 rounded ${page === index + 1 ? 'bg-[#7090e3] text-white' : 'bg-gray-200 text-black'}`} disabled={page === index + 1}>
                                        {index + 1}
                                   </button>
                              ))}
                         </div>

                         {isLoading &&
                              <div className='-mt-6 bg-white h-[calc(100%)]'>
                                   {[...Array(2)].map((_, index) => (
                                        <div key={index} className='scale-[90%] -mt-10'>
                                             <PostAniamtion />
                                        </div>
                                   ))}
                              </div>
                         }

                         {isError && <div className='h-[calc(100%)] bg-white'><ServerError width={80} height={40} paddingTop={40} /></div>}
                    </div>


               </div>
          </div>
     )
}

export default GroupPostDisplay