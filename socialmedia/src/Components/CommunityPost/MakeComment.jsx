import React, { useEffect, useState } from 'react';
import DisplayComment from './DisplayComment';
import API from "../../Services/API"
import { useMutation, useIsMutating, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { warning } from './CommunityPostFunction';

const MakeComment = ({ setWarning, postId, setSelectCommet, index, selectCommet }) => {

     const [comment, setComment] = useState("");
     const [commentCount, setCommentCount] = useState("");
     const [likeCount, setLikeCount] = useState();
     const [isUserLiked, setIsUserLiked] = useState(false);
     const { groupId } = useParams();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     const makeCommnet = async ({ postId, commenterId: userId,  comment }) => {
          const response = await API.post('/makeGroupPostComment', { postId: postId, commenterId: userId, comment: comment });
          return response.data;
     }

     const { mutate: handleCreateComment } = useMutation({
          mutationKey: (['makeGroupPostComment', postId]),
          mutationFn: makeCommnet,
          onSuccess: () => {
               setComment('');
               setCommentCount((prev) => prev + 1);
          },
          onError: () => {
               warning(setWarning, true, 5000)
          }
     });

     const postLike = async () => {
          const response = await API.post('/groupPostLike', { groupId: groupId, userId: userId, groupPostId: postId });
          return response.data;
     }

     const { mutate: handlePostLike } = useMutation({
          mutationKey: (['handlePostLike', userId]),
          mutationFn: postLike,
          onSuccess: (data) => {
               setLikeCount(data?.totalLike);
               isUserLiked ? setIsUserLiked(false) : setIsUserLiked(true)
          },
          onError: () => {
               warning(setWarning, true, 5000)
          }
     });

     const fetchPostCommentCount = async () => {
          const response = await API.post('/postLikeAndCommnetCount', { groupId: groupId, postId: postId, userId: userId });
          return response.data;
     };

     const { data, isLoading, isError } = useQuery({
          queryKey: ['fetchPostCommentCount', postId, groupId],
          queryFn: () => fetchPostCommentCount(postId, groupId),
          enabled: !!postId && !!groupId,
          staleTime: Infinity,
     });

     useEffect(() => {
          data?.userLiked && setIsUserLiked(true);
          setLikeCount(data?.likeCount);
          setCommentCount(data?.commentCount);
     }, [data])

     const isCommenting = useIsMutating(['makeGroupPostComment', postId]);

     return (
          <>
               {(!isLoading && !isError) && (
                    <div className="flex items-center justify-between mx-4">
                         <div className="flex gap-5 flex-row-reverse">
                              <div className='flex flex-col place-content-center items-center h-14'>
                                   <svg className='cursor-pointer hover:opacity-75 active:opacity-50' onClick={() => setSelectCommet(index)} fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                                   <div>{commentCount}</div>
                              </div>
                              <div className='cursor-pointer hover:opacity-80 active:opacity-50 flex flex-col place-content-center items-center'>
                                   <svg onClick={() => handlePostLike()} xmlns="http://www.w3.org/2000/svg" fill={isUserLiked ? '#173382' : 'black'} className="bi bi-hand-thumbs-up w-[26px] h-[26px] bg-white" viewBox="0 0 16 16">
                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                   </svg>
                                   <div>{likeCount}</div>
                              </div>
                         </div>
                    </div>

               )}
               {(selectCommet === index) &&
                    <div className={`bg-white h-[380px] w-full left-0 delay-[1s] duration-[3s] rounded-t-xl absolute ${index === selectCommet ? 'bottom-0' : '-bottom-[200%]'}`}>

                         <DisplayComment postId={postId} setSelectCommet={setSelectCommet} />

                         <form className="bg-white px-2 w-full absolute bottom-0 sm:py-3 py-2.5 pt-1 flex items-center gap-1 z-30" onSubmit={(e) => { e.preventDefault(); handleCreateComment({ postId: postId, commenterId: userId, comment: comment }) }} >
                              <div className="flex-1 relative pt-2">
                                   <textarea maxLength={100} value={comment} onChange={(e) => setComment(e.target.value)} required placeholder="Add Comment (max 100 words)" rows="1" className="w-full resize-none h-10 focus:h-20 duration-100 px-3 pt-1 hover:pt-1 bg-gray-200 focus:bg-gray-300 focus:!border-transparent focus:!ring-transparent rounded-xl outline-none" />
                              </div>
                              {comment.trim() && (
                                   <button disabled={isCommenting} type="submit" className={`text-sm rounded-full py-1.5 px-3.5 bg-secondery active:opacity-70 ${isCommenting ? 'cursor-not-allowed' : 'cursor-pointer'}`} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#5771b5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                   </button>
                              )}
                         </form>
                    </div>
               }
          </>
     );
};

export default MakeComment;
