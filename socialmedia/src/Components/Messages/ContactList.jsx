import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMessagingData } from "../../Features/Counter/counterSlice";
import { Link } from "react-router-dom";
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';
// import CreateGroup from './CreateGroup';

const ContactList = ({ toggleDisplay }) => {

     function getChatLink(loggedUser, personId) {
          const user1IdString = loggedUser.toString();
          const user2IdString = personId.toString();
          const sortedUserIds = [user1IdString, user2IdString].sort().join('');
          const convoId = sortedUserIds;
          return `/message/${convoId}`;
     }

     const dispatch = useDispatch()
     const loggedUser = useSelector((state) => state.LoginSlice.loggedUserId);
     const [chatList, setchatList] = useState("");
     const [isLaoding, setIsLaoding] = useState(true)

     const getChatList = () => {
          API.post("/contactList").then((res) => {
               setchatList(res.data);
               setIsLaoding(false)
          })
               .catch((error) => {
                    console.log(error);
               });
     };

     useEffect(() => {
          getChatList();
     }, []);

     const handleItemClick = (senderId, receiverId, reciverPhoto) => {
          localStorage.setItem('receiverId', receiverId);
          dispatch(setMessagingData({ senderId: senderId, receiverId: receiverId, reciverPhoto: reciverPhoto }))
          toggleDisplay(false);
     };
     return (
          <div className='select-none w-screen pr-2 border-r example relative pb-20 lg:pb-5  lg:mt-3 lg:pt-[20px]'>
               <div className="h-screen overflow-y-scroll example relative mt-26">
                    <div id="side-chat" className="top-0 left-0  bg- z-50">
                         <div className="z-50 w-full">
                              <div className="flex place-content-center items-center pl-2 pb-2 justify-between">
                                   <div className="text-3xl font-bold text-black text-left">Chats</div>
                                   <div className='bg-[#6e8ee1] rounded-full px-2 py-1 flex place-content-center items-center'>
                                        <div className="text-sm font-semibold text-white text-left h-fit my-auto">Create Group</div>
                                   </div>
                              </div>
                         </div>
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
                                   <div className="space-y-2 overflow-y-auto">
                                        {chatList.chatList?.filter(person => person._id !== loggedUser).map((person, index) => (
                                             <Link to={getChatLink(loggedUser, person._id)} style={{ textDecoration: 'none' }} key={index} onClick={() => handleItemClick(loggedUser, person._id, person.secondPerson[0]?.profilePhoto)} className="cursor-pointer relative flex items-center gap-4 p-2 duration-200 active:opacity-60">
                                                  <div className="relative w-14 h-14 shrink-0">
                                                       <img src={person.secondPerson[0]?.profilePhoto || noProfilePicture} onError={(e) => { e.target.src = noProfilePicture }} alt="imgErr" className="border-black object-contain w-full h-full rounded-full" style={{ border: "2px solid black" }} />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                       <div className="flex items-center gap-2 mb-1.5">
                                                            <div className="mr-auto text-sm text-black font-medium">{person?.firstName} {person?.lastName}</div>
                                                       </div>
                                                       <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">{person?.userName}</div>
                                                  </div>
                                             </Link>
                                        ))}
                                        <div className='text-xs text-center text-gray-500 font-thin'>List Ends Here</div>
                                   </div>
                              )
                         }

                         {/* <CreateGroup/> */}

                    </div>
               </div>
          </div>
     )
}

export default ContactList;