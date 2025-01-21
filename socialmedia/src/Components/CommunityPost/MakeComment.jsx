import React, { useState } from 'react';
import DisplayComment from './DisplayComment';
import API from "../../Services/API"
import { useMutation, useIsMutating } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const MakeComment = ({ postId, setSelectCommet, index, selectCommet }) => {

     const [comment, setComment] = useState("");
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     const makeCommnet = async ({ postId: postId, commenterId: userId, comment: comment }) => {
          const response = await API.post('/makeGroupPostComment', { postId: postId, commenterId: userId, comment: comment });
          return response.data;
     }

     const { mutate: handleCreateComment } = useMutation({
          mutationKey: (['makeComment', postId]),
          mutationFn: makeCommnet,
          onSuccess: (data) => {
               console.log(data);
          },
          onError: () => {
               alert("wrong");
          }
     });

     const isCommenting = useIsMutating(['makeComment', postId]);

     return (
          <>
               <div className="flex items-center justify-between pb-3 mx-4 mt-3">
                    <div className="flex gap-5 flex-row-reverse">
                         <div className='flex flex-col place-content-center items-center'>
                              <svg className='cursor-pointer hover:opacity-75 active:opacity-50' onClick={() => setSelectCommet(index)} fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>
                         </div>
                         <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    </div>
               </div>
               {(selectCommet === index) &&
                    <div className={`bg-white h-[380px] w-full left-0 delay-[1s] duration-[3s] rounded-t-xl absolute ${index === selectCommet ? 'bottom-0' : '-bottom-[200%]'}`}>

                         <DisplayComment postId={postId} setSelectCommet={setSelectCommet} />

                         <form className="bg-white pl-2 w-full absolute bottom-0 sm:py-3 py-2.5 pt-1 flex items-center gap-1" onSubmit={(e) => { e.preventDefault(); handleCreateComment({ postId: postId, commenterId: userId, comment: comment }) }} >
                              <div className="flex-1 relative pt-2">
                                   <textarea maxLength={100} value={comment} onChange={(e) => setComment(e.target.value)} required placeholder="Add Comment (max 100 words)" rows="1" className="w-full resize-none h-10 focus:h-20 duration-100 px-3 pt-1 hover:pt-1 bg-gray-200 focus:bg-gray-300 focus:!border-transparent focus:!ring-transparent rounded-xl outline-none" />
                              </div>
                              <button disabled={isCommenting || !comment.trim()} type="submit" className={`text-sm rounded-full py-1.5 px-3.5 bg-secondery active:opacity-70 ${isCommenting ? 'cursor-not-allowed' : 'cursor-pointer'}`} >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="#5771b5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                   </svg>
                              </button>
                         </form>
                    </div>
               }
          </>
     );
};

export default React.memo(MakeComment);