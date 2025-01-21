import React, { useState } from 'react'
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';
import GroupList from '../GroupChat/GroupList';
import { useSelector, useDispatch } from 'react-redux';
import { setMessagingData } from "../../Features/Counter/counterSlice";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

const ContactList = ({ toggleDisplay }) => {

     const dispatch = useDispatch()
     const loggedUser = useSelector((state) => state.LoginSlice.loggedUserId);
     const [display, setDisplay] = useState(false)

     function getChatLink(loggedUser, personId) {
          const user1IdString = loggedUser.toString();
          const user2IdString = personId.toString();
          const sortedUserIds = [user1IdString, user2IdString].sort().join('');
          const convoId = sortedUserIds;
          return `/message/${convoId}`;
     }

     const getChatLists = async () => {
          const response = await API.post("/contactList");
          return response.data;
     }

     const { data:chatList, isLoading:isLaoding } = useQuery({
          queryKey: (['contactList']),
          queryFn: getChatLists,
          enabled: !!loggedUser,
          staleTime:Infinity,
     })

     const handleItemClick = (senderId, receiverId, reciverPhoto) => {
          localStorage.setItem('receiverId', receiverId);
          dispatch(setMessagingData({ senderId: senderId, receiverId: receiverId, reciverPhoto: reciverPhoto }))
          toggleDisplay(false);
     };
     return (
          <div className='select-none w-screen pr-2 border-r example relative pb-20 lg:pb-5  lg:mt-3 lg:pt-[20px]'>
               <div className="h-screen overflow-y-scroll example relative mt-26">
                    <div className="px-1 w-full flex place-content-center justify-between mb-2">
                         <div onClick={() => setDisplay(false)} className={`flex cursor-pointer w-full pr-3 pb-.5 space-x-2 ${!display ? 'opacity-100' : 'opacity-50'}`}>
                              <div className="text-2xl font-semibold text-black text-left mt-1">Chats</div>
                         </div>
                         <div onClick={() => setDisplay(true)} className={`hidden flex cursor-pointer place-content-end w-full pl-3 pb-.5 space-x-2 ${display ? 'opacity-100' : 'opacity-50'}`}>
                              <div className="text-2xl font-semibold text-black text-left mt-1">Gropu</div>
                         </div>
                    </div>
                    <div className='flex overflow-hidden '>
                         <div className={`w-full flex-shrink-0 duration-500 ${display ? '-translate-x-full' : '-translate-x-0'}`}>
                              {isLaoding ?
                                   (
                                        <>
                                             {[...Array(9)].map((_, index) => (
                                                  <div key={index}>
                                                       <FriendProfileLoadingAnimation />
                                                  </div>
                                             ))}
                                        </>
                                   ) : (
                                        <div className="overflow-y-auto w-full divide-y divide-gray-400/20">
                                             {chatList?.chatList?.filter(person => person?._id !== loggedUser).map((person, index) => (
                                                  <Link to={getChatLink(loggedUser, person?._id)} style={{ textDecoration: 'none' }} key={index} onClick={() => handleItemClick(loggedUser, person._id, person?.secondPerson[0]?.profilePhoto)} className="cursor-pointer relative flex items-center gap-4 p-2 duration-200 active:opacity-60">
                                                       <div className="relative w-14 h-14 shrink-0">
                                                            <img src={person?.secondPerson[0]?.profilePhoto || noProfilePicture} onError={(e) => { e.target.src = noProfilePicture }} alt="imgErr" className="object-cover w-full h-full rounded-full" style={{ border: "1px solid gray" }} />
                                                       </div>
                                                       <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                 <div className="mr-auto text-sm text-black font-semibold">{person?.firstName} {person?.lastName}</div>
                                                            </div>
                                                            <div className="font-medium overflow-hidden text-ellipsis text-[13px] -mt-1 whitespace-nowrap">{person?.userName}</div>
                                                       </div>
                                                  </Link>
                                             ))}
                                             <div className='text-xs text-center text-gray-500 font-thin pt-3'>List Ends Here</div>
                                        </div>
                                   )
                              }
                         </div>

                         {display && (

                              <div className={`w-full flex-shrink-0 duration-500 ${display ? '-translate-x-full' : '-translate-x-0'}`}>
                                   <GroupList display={display} />
                              </div>
                         )
                         }
                    </div>
               </div>

          </div>
     )
}

export default ContactList;