import React, { useState } from 'react'
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import CreateGroupImg from "../../Assets/images/icons/makeGroup.png";
import CreateGroup from './CreateGroup';
import ServerError from '../Animation/ServerError';
import JoinRequestButton from './JoinRequestButton';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getJoinedGroupList, getNotJoinedGroupList } from './GroupChatFunctions';

const GroupList = () => {

     const [displayModal, setDisplayModal] = useState(false);
     const groupPhoto = 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png';
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     const { data, isLoading, isError } = useQuery(
          {
               queryKey: ['getGroupList', userId],
               queryFn: () => getJoinedGroupList(userId),
               enabled: !!userId,
               staleTime: Infinity,
               gcTime: 1000 * 60 * 10,
          }
     )

     const { data: notJoinedGroup, isLoading: isNotJoinedLoading, isError: isNotJoinedError } = useQuery({
          queryKey: (['getNotJoinedGroupList', userId]),
          queryFn: () => getNotJoinedGroupList(userId),
          enabled: !!userId,
          staleTime: Infinity
     })

     return (
          <div className='h-screen'>

               {/* Create Group Strats */}
               <div className={`w-full duration-500 absolute top-4 -translate-x-full mt-20`}>

                    <div className='relative mx-auto w-fit'>
                         <div className='bg-[#6882d0] w-fit h-fit p-3 shadow-2xl rounded-full'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-20">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                              </svg>
                         </div>
                         <div className='absolute bottom-0 right-0 z-20 rounded-full backdrop-blur-[4px] p-2 shadow-2xl'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6 animate-spin">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                         </div>
                    </div>

                    <div className='w-fit mx-auto font-semibold text-lg sm:text-xl text-center md:text-2xl mt-3 text-black/80'>Goup Chat Feature is Still In Deveploment</div>

                    <ul className="mt-3 space-y-3 font-medium mx-auto flex-col place-content-center items-center">
                         <li className="flex items-start w-fit mx-auto">
                              <div className="flex-shrink-0">
                                   <svg className="w-5 h-5 text-[#6882d0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <p className="ml-3 leading-5 text-gray-600">
                                   Group Chat
                              </p>
                         </li>
                         <li className="flex items-start w-fit mx-auto">
                              <div className="flex-shrink-0">
                                   <svg className="w-5 h-5 text-[#6882d0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <p className="ml-3 leading-5 text-gray-600">
                                   Community Post
                              </p>
                         </li>
                         <li className="flex items-start w-fit mx-auto">
                              <div className="flex-shrink-0">
                                   <svg className="w-5 h-5 text-[#6882d0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <p className="ml-3 leading-5 text-gray-600">
                                   AI assistaning Tools
                              </p>
                         </li>
                         <li className="flex items-start w-fit mx-auto">
                              <div className="flex-shrink-0">
                                   <svg className="w-5 h-5 text-[#6882d0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <p className="ml-3 leading-5 text-gray-600">
                                   Group Scheduling Message
                              </p>
                         </li>
                         <li className="flex items-start w-fit mx-auto">
                              <div className="flex-shrink-0">
                                   <svg className="w-5 h-5 text-[#6882d0]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                   </svg>
                              </div>
                              <p className="ml-3 leading-5 text-gray-600">
                                   Responsive UI/UX Desing
                              </p>
                         </li>
                    </ul>
               </div>
               {false && (
                    <CreateGroup displayModal={displayModal} />
               )}

               {false && (
                    <div onClick={() => displayModal ? setDisplayModal(false) : setDisplayModal(true)} className='cursor-pointer fixed z-50 bottom-[calc(100%-620px)] right-1.5 sm:right-5 bg-[#637ac7] flex place-content-center items-center space-x-2 w-fit h-fit rounded-full py-1 px-3 text-white font-semibold tracking-wider '>
                         <div className='relative rounded-full p-1'>
                              <img src={CreateGroupImg} alt="addGroup" className='w-6 h-6 rounded-full' />
                         </div>
                         <div className='text-xs md:text-base'>{!displayModal ? 'Create Group' : 'Go Back'}</div>
                    </div>
               )}

               {false && (
                    <div className={`w-full duration-500 absolute top-4 ${displayModal ? '-translate-x-full' : '-translate-x-0'}`}>
                         {isError && (
                              <ServerError width={60} height={28} paddingTop={10} />
                         )}

                         {isLoading ? (
                              <>
                                   {[...Array(8)].map((_, index) => (
                                        <FriendProfileLoadingAnimation key={index} />
                                   ))}
                              </>
                         )
                              :
                              <div className="w-full">
                                   <div className="divide-gray-200">
                                        {data?.groupList?.map((items) => (
                                             <Link to={`/groupmessage/${items?._id}`} key={items?._id} style={{ textDecoration: 'none' }} className="w-full text-left cursor-pointer hover:opacity-80 active:opacity-35 focus:outline-none focus-visible:bg-indigo-50">
                                                  <div className="py-2 flex items-center space-x-3 px-1 border-b-[1px] border-slate-300/40 w-full">
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

                                        {data?.groupList.length === 0 && (<div className='text-[14px] text-center text-gray-500 font-thin'>You haven't Join Any Group </div>)}
                                   </div>
                              </div>
                         }

                         {
                              (!isNotJoinedLoading && !isNotJoinedError) ? (
                                   <div className="divide-gray-200 w-full">
                                        {notJoinedGroup?.groupList?.map((items, index) => (
                                             <div key={index} className="flex items-center justify-between w-full text-left cursor-pointer focus:outline-none focus-visible:bg-indigo-50">
                                                  <div className="py-2 flex items-center space-x-3 px-1 border-b-[1px] border-slate-300/40">
                                                       <div className='relative w-14 h-14 shrink-0 border-[1px] rounded-full border-gray-700 overflow-hidden'>
                                                            <img className="object-cover w-14 h-14" src={items?.groupIcon || groupPhoto} onError={(e) => e.target.src = groupPhoto} alt="Group Icon" />
                                                       </div>
                                                       <div>
                                                            <h4 className="text-sm font-semibold text-gray-800">{items?.groupName}</h4>
                                                            <div className="text-[13px] text-gray-700">{items?.groupDesc}</div>
                                                       </div>
                                                  </div>
                                                  <JoinRequestButton userId={userId} groupId={items?._id} />
                                             </div>
                                        ))}

                                   </div>
                              ) : null
                         }
                         <div className='text-[14px] pt-3 text-center text-gray-500 font-thin'>List End Here</div>
                    </div>
               )}
          </div>
     )
}

export default GroupList