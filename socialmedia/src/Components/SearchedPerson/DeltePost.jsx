import React, { useState } from 'react';
import API from '../../Services/API';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const DeltePost = ({likedBy, post, index}) => {

     const [delteOption, setDeleteOption] = useState(null);
     const queryClient = useQueryClient();

     const deletePost = async (postId) => {
          try {
               const res = await API.post("/deletePost", { postId: postId });
               if (res.status) {
                    setDeleteOption(null);
                    queryClient.invalidateQueries(['searchedPerosnPost']);
               }
          } catch (error) {
               toast.error("Someting Went Wrong")
          }
     }

     return (
          <>
               <ToastContainer />

               {likedBy === post?.userId && (
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
          </>
     )
}

export default DeltePost