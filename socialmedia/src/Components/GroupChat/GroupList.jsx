import React, { useState } from 'react'
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import CreateGroupImg from "../../Assets/images/icons/makeGroup.png";
import CreateGroup from './CreateGroup';
import API from '../../Services/API';
import ServerError from '../Animation/ServerError';
import groupPhoto from '../../Assets/NoProileImage.png';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const GroupList = () => {

     const [displayModal, setDisplayModal] = useState(false);
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     const getList = async () => {
          const response = await API.post('/groupList', { userId: userId });
          return response.data;
     }

     const { data, isLoading, isError } = useQuery(
          {
               queryKey: ['getGroupList', userId],
               queryFn: getList,
               enabled: !!userId,
               staleTime: Infinity,
               gcTime: 1000 * 60 * 10,
          }
     )

     return (
          <>

               {isError && (
                    <ServerError width={60} height={28} paddingTop={10} />
               )}

               {
                    isLoading ? (
                         <>
                              {[...Array(8)].map((_, index) => (
                                   <FriendProfileLoadingAnimation key={index} />
                              ))}
                         </>
                    )
                         :
                         <>
                              <div className="w-full h-screen">
                                   <div className="divide-gray-200">
                                        {data?.groupList?.map((items, index) => (
                                             <Link to={`/groupmessage/${items?._id}`} key={index} style={{ textDecoration: 'none' }} className="w-full text-left cursor-pointer hover:opacity-80 active:opacity-35 focus:outline-none focus-visible:bg-indigo-50">
                                                  <div className="py-2 flex items-center space-x-3 px-1 border-b-[1px] border-slate-300/40">
                                                       <div className='relative w-14 h-14 shrink-0 border-[1px] rounded-full border-gray-700 overflow-hidden'>
                                                            <img className="object-cover w-14 h-14" src={items?.groupIcon || groupPhoto} onError={(e) => e.target.src = groupPhoto} alt="Group Icon" />
                                                       </div>
                                                       <div>
                                                            <h4 className="text-sm font-semibold text-gray-800">{items?.groupName}</h4>
                                                            <div className="text-[13px] text-gray-700">{items?.groupDesc}</div>
                                                       </div>
                                                  </div>
                                             </Link>
                                        ))}

                                        {data?.groupList.length > 0  && (
                                             <div className='text-[14px] pt-3 text-center text-gray-500 font-thin'>List End Here</div>
                                        )}

                                        {data?.groupList.length === 0 && (<div className='text-[14px] pt-40 text-center text-gray-500 font-thin'>You haven't Join Any Group </div>)}
                                   </div>
                              </div>

                              <CreateGroup displayModal={displayModal} />

                              <div onClick={() => displayModal ? setDisplayModal(false) : setDisplayModal(true)} className='cursor-pointer fixed right-1.5 sm:right-5 bottom-[calc(100%-620px)] lg:bottom-[calc(100%-670px)] bg-[#637ac7] flex place-content-center items-center space-x-2 w-fit h-fit rounded-full py-1 px-3 text-white font-semibold tracking-wider '>
                                   {
                                        displayModal ?
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-180">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                             </svg>
                                             :
                                             <div className='relative rounded-full p-1'>
                                                  <img src={CreateGroupImg} alt="addGroup" className='w-6 h-6 rounded-full' />
                                             </div>
                                   }
                                   <div>{!displayModal ? 'Create Group' : 'Go Back'}</div>
                              </div>
                         </>
               }
          </>
     )
}

export default GroupList