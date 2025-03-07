import React, { useState, useEffect } from 'react';
import FriendProfileLoadingAnimation from '../Animation/FriendProfileLoadingAnimation';
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';
import GroupList from '../GroupChat/GroupList';
import { useSelector, useDispatch } from 'react-redux';
import { setMessagingData } from '../../Features/Counter/counterSlice';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const ContactList = ({ toggleDisplay }) => {
     const dispatch = useDispatch();
     const [peopleList, setPeopleList] = useState([]);
     const loggedUser = useSelector((state) => state.LoginSlice.loggedUserId);
     const [display, setDisplay] = useState(false);
     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];

     function getChatLink(loggedUser, personId, profilePhoto) {
          const user1IdString = loggedUser.toString();
          const user2IdString = personId.toString();
          const sortedUserIds = [user1IdString, user2IdString].sort().join('');
          return `/message/${sortedUserIds}?photo=${encodeURIComponent(profilePhoto || noProfilePicture)}`;
     }

     const getChatLists = async (loggedUser) => {
          const response = await API.post('/contactList', { userId: loggedUser });
          return response.data;
     };

     const { data: chatList, isLoading } = useQuery({
          queryKey: ['contactList', loggedUser],
          queryFn: () => getChatLists(loggedUser),
          enabled: !!loggedUser,
          staleTime: Infinity,
     });

     useEffect(() => {
          chatList?.chatList?.forEach((people) => {
               setPeopleList((prev) => {
                    return prev.includes(people?._id) ? prev : [...prev, people?._id];
               });
          });
     }, [chatList]);

     const getProfilePic = async () => {
          if (Array.isArray(peopleList) && peopleList.length > 0) {
               const response = await API.post('/profilePicture', { userIdArray: peopleList });
               return response.data?.photo;
          }
     };

     const { data: commeterProfilePhoto } = useQuery({
          queryKey: ['chatListPeoplePicture', peopleList],
          queryFn: getProfilePic,
          enabled: !!peopleList.length,
          staleTime: Infinity,
     });

     const handleItemClick = (senderId, receiverId, reciverPhoto) => {
          localStorage.setItem('receiverId', receiverId);
          dispatch(setMessagingData({ senderId, receiverId, reciverPhoto }));
          toggleDisplay(false);
     };

     return (
          <div className='select-none w-screen pr-2 border-r example relative pb-20 lg:pb-5 lg:mt-3 lg:pt-[20px]'>
               <div className='h-screen overflow-y-scroll example relative mt-26'>
                    <div className='px-1 w-full flex place-content-center justify-between mb-2'>
                         <div onClick={() => setDisplay(false)} className={`flex cursor-pointer w-full pr-3 pb-.5 space-x-2 ${!display ? 'opacity-100' : 'opacity-50'}`}>
                              <div className='text-2xl font-semibold text-black text-left mt-1'>Chats</div>
                         </div>
                         <div onClick={() => setDisplay(true)} className={`flex cursor-pointer place-content-end w-full pl-3 pb-.5 space-x-2 ${display ? 'opacity-100' : 'opacity-50'}`}>
                              <div className='text-2xl font-semibold text-black text-left mt-1'>Group</div>
                         </div>
                    </div>

                    <div className='flex overflow-hidden '>
                         <div className={`w-full flex-shrink-0 duration-500 ${display ? '-translate-x-full' : '-translate-x-0'}`}>
                              {isLoading ? (
                                   [...Array(9)].map((_, index) => (
                                        <div key={index}>
                                             <FriendProfileLoadingAnimation />
                                        </div>
                                   ))
                              ) : (
                                   <div className='overflow-y-auto w-full divide-y divide-gray-400/20'>
                                        {chatList?.chatList?.filter(person => person?._id !== loggedUser).map((person, index) => {
                                             const userPhoto = commeterProfilePhoto?.find(photo => photo?.userId === person?._id)?.profilePhoto;

                                             return (
                                                  <Link
                                                       to={getChatLink(loggedUser, person?._id, userPhoto)}
                                                       style={{ textDecoration: 'none' }}
                                                       key={index}
                                                       onClick={() => handleItemClick(loggedUser, person._id, userPhoto)}
                                                       className='cursor-pointer relative flex items-center gap-4 p-2 duration-200 active:opacity-60'
                                                  >
                                                       <div className='flex items-center place-content-center w-[98%] gap-x-4'>
                                                            <div className='relative w-14 h-14 shrink-0'>
                                                                 {commeterProfilePhoto === undefined ? (
                                                                      <div className='capitalize text-white text-center flex place-content-center items-center w-10 h-10 md:w-14 md:h-14 shadow-[1px_1px_1px_1px_#f2f2f2] rounded-full text-xl md:text-3xl' style={{ backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)] }}>{person?.firstName?.[0] || 'U'}</div>
                                                                 ) : userPhoto ? (
                                                                      <img src={userPhoto} onError={(e) => (e.target.src = noProfilePicture)} alt='Profile' className='text-white w-10 h-10 md:w-14 md:h-14 shadow-[1px_1px_1px_1px_#f2f2f2] border rounded-full object-cover'/>
                                                                 ) : (
                                                                      <img src={noProfilePicture} alt='Profile' className='w-10 h-10 md:w-14 md:h-14 shadow-[1px_1px_1px_1px_#f2f2f2] border rounded-full object-cover'/>
                                                                 )}
                                                            </div>
                                                            <div className='flex-1'>
                                                                 <div className='flex items-center gap-2 mb-1.5'>
                                                                      <div className='mr-auto text-sm text-black font-semibold'>{person?.firstName} {person?.lastName}</div>
                                                                 </div>
                                                                 <div className='font-medium overflow-hidden text-ellipsis text-[13px] -mt-1 whitespace-nowrap'>{person?.userName}</div>
                                                            </div>
                                                       </div>
                                                       {person?.unreadCount > 0 && (
                                                            <div className='scale-75 rounded-full px-[10px] py-0.5 h-fit w-fit text-white font-bold bg-[#5a70b7]'>
                                                                 {person?.unreadCount > 10 ? person?.unreadCount + '+' : person?.unreadCount}
                                                            </div>
                                                       )}
                                                  </Link>
                                             );
                                        })}
                                        <div className='text-xs text-center text-gray-500 font-thin pt-3'>List Ends Here</div>
                                   </div>
                              )}
                         </div>

                         {display && <GroupList display={display} />}
                    </div>
               </div>
          </div>
     );
};

export default ContactList;
