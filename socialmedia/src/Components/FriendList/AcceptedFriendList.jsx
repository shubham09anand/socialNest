import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noProfilePicture from '../../Assets/NoProileImage.png';
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import API from "../../Services/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const AcceptedFriendList = () => {
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     const [friendList, setFriendList] = useState([]);
     const [loading, setLoading] = useState(true);
     const [buttonDisabled, setButtonDisabled] = useState(false);

     const getFriendList = () => {
          API.post("/friendList", { userId: userId })
               .then((res) => {
                    setFriendList(res.data.friendList);
                    setLoading(false);
               })
               .catch((error) => {
                    console.log(error);
               });
     };

     const removeFriend = (friendId) => {
          setButtonDisabled(true);
          API.post("/removeFriend", { userId: userId, friendId: friendId })
               .then((res) => {
                    if (res.data.status === 1) {
                         setFriendList((prevFriendList) =>
                              prevFriendList.filter(
                                   (friend) => friend?.friendProfile[0]?._id !== friendId
                              )
                         );
                         setButtonDisabled(false);
                    }
               })
               .catch(() => {
                    toast.error("Someting Went Wrong")
               }).finally(() => {
                    setButtonDisabled(false);
               });
     };

     useEffect(() => {
          // eslint-disable-next-line
          getFriendList();
          // eslint-disable-next-line
     }, [userId]);

     return (
          <div className="w-full">
               <ToastContainer/>
               <div className="border-b mt-4 flex place-content-center items-center space-x-5 pb-2">
                    <div className="text-3xl font-extralight">Friends With</div>
                    <div className="">
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                         </svg>
                    </div>
               </div>
               {loading ? (
                    <>
                         <FriendProfileLoadingAnimation />
                         <FriendProfileLoadingAnimation />
                         <FriendProfileLoadingAnimation />
                         <FriendProfileLoadingAnimation />
                    </>
               ) : (
                    <div className="w-full">
                         {friendList?.length > 0 ?
                              <ul className="w-full divide-y divide-gray-200">
                                   {friendList?.map((friend, index) => (
                                        <li key={index} className="py-2 lg:px-40 w-full mt-3 pb-0 flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between place-content-center items-center border-b">
                                             <div key={index} className="flex flex-col md:flex-row space-y-4 place-content-center items-center space-x-4 md:space-x-40 lg:space-x-96 mx-auto">
                                                  <Link to={`/searched-person/${friend?.friendProfile[0]?._id}`} style={{ textDecoration: "none" }} className="flex items-center space-x-10 sm:space-x-5 rtl:space-x-reverse">
                                                       <div className="flex-shrink-0">
                                                            <img className="w-16 h-16 rounded-full object-contain" style={{ border: '3px solid black' }} src={friend?.friendPhoto[0]?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile" />
                                                       </div>
                                                       <div className="flex-1 min-w-0">
                                                            <p className="text-lg font-semibold text-gray-900 w-40 truncate">
                                                                 {friend?.friendProfile[0]?.firstName} {friend.friendProfile[0]?.lastName}
                                                            </p>
                                                            <p className="font-medium text-gray-700 truncate">
                                                                 {friend?.friendProfile[0]?.userName}
                                                            </p>
                                                       </div>
                                                  </Link>
                                                  <button disabled={buttonDisabled} className={`select-none rounded-sm px-4 h-fit py-1 bg-red-500 active:opacity-40 text-white ${buttonDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={() => removeFriend(friend?.friendProfile[0]?._id)}>Remove</button>
                                             </div>
                                        </li>
                                   ))}
                              </ul>
                              :
                              <div className="text-gray-500 mt-6 text-center">You Don't Have Any Friends. Well That Sucks.</div>
                         }
                    </div>
               )}
          </div>
     );
};

export default AcceptedFriendList;
