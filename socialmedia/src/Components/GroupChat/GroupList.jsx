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
               <CreateGroup displayModal={displayModal} />

               <div onClick={() => displayModal ? setDisplayModal(false) : setDisplayModal(true)} className='cursor-pointer fixed z-50 bottom-[calc(100%-620px)] right-1.5 sm:right-5 bg-[#637ac7] flex place-content-center items-center space-x-2 w-fit h-fit rounded-full py-1 px-3 text-white font-semibold tracking-wider '>
                    <div className='relative rounded-full p-1'>
                         <img src={CreateGroupImg} alt="addGroup" className='w-6 h-6 rounded-full' />
                    </div>
                    <div className='text-xs md:text-base'>{!displayModal ? 'Create Group' : 'Go Back'}</div>
               </div>

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
          </div>
     )
}

export default GroupList