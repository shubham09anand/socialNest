import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noProfilePicture from '../../Assets/NoProileImage.png';
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import API from "../../Services/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const RecivedFriendRequesList = () => {
  const [RecivedRequest, setRecivedRequest] = useState();
  const [action, setAction] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const userId = useSelector((state) => state.LoginSlice.loggedUserId);

  useEffect(() => {
    const recivedRequest = async () => {
      try {
        const response = await API.post("/recivedFriendRequest", { userId: userId });
        setRecivedRequest(response.data);
        setAction(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    recivedRequest();
  }, [userId]);

  const updateFriendStatus = async (action, senderId) => {
    setButtonDisabled(true);
    try {
      const response = await API.post("/processFriendRequest", {
        senderId: senderId,
        reciverId: userId,
        action: action,
      });

      if (response.data.status === 1 && action === "Accepted") {

        setRecivedRequest((prevFriendList) => {
          const updatedFriendList = { ...prevFriendList };
          updatedFriendList.FriendRequestList = updatedFriendList.FriendRequestList.filter(
            (friend) => friend.senderProfile[0]._id !== senderId
          );
          toast.success("Friend Reuest Accepted")
          return updatedFriendList;
          
        });
      } else if (response.data.status === 0 && action === "Rejected") {
        
        setRecivedRequest((prevFriendList) => {
          const updatedFriendList = { ...prevFriendList };
          updatedFriendList.FriendRequestList = updatedFriendList.FriendRequestList.filter(
            (friend) => friend.senderProfile[0]._id !== senderId
          );
          toast.success("Friend Reuest Rejeted")
          return updatedFriendList;
        });
      }
    } catch (error) {
      console.error("Error updating friend status");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="border-b mt-4 flex place-content-center items-center space-x-5 pb-2">
        <div className="text-3xl font-extralight">Received Requests</div>
        <div className="rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </div>
      </div>
      {action ? (
        <>
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
          <FriendProfileLoadingAnimation />
        </>
      ) : RecivedRequest?.FriendRequestList.length !== 0 ? (
        <div className="w-full">
          <ul className="w-full divide-y divide-gray-200">
            {RecivedRequest?.FriendRequestList.map((friend, index) => (
              <li key={friend._id} className="lg:px-40 py-3 pb-0 flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between place-content-center items-center">
                <Link to={`/searched-person/${friend.senderProfile[0]?._id}`} style={{ textDecoration: "none" }} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    {friend?.senderPhoto[index]?.profilePhoto && (<img className="w-16 h-16 rounded-full object-contain border-black" style={{ border: '3px solid black' }} src={friend?.senderPhoto[index]?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile avatar" />)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900 w-40 truncate">{friend?.senderProfile[0]?.firstName} {friend?.senderProfile[0]?.lastName}</p>
                    <p className="text-sm font-medium text-gray-700 truncate">{friend?.senderProfile[0]?.userName}</p>
                  </div>
                </Link>
                <div className="flex space-x-5">
                  <button disabled={buttonDisabled} onClick={() => updateFriendStatus("Accepted", friend?.senderProfile[0]?._id)} className={`bg-blue-600 text-white rounded-sm px-4 py-1 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} w-fit h-fit`}>Accept</button>
                  <button disabled={buttonDisabled} onClick={() => updateFriendStatus("Rejected", friend?.senderProfile[0]?._id)} className={`bg-red-600 text-white rounded-sm px-4 py-1 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} w-fit h-fit`}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-gray-500 mt-6 px-2 text-center">No Friend Requests. Well, seems like no one likes you!</div>
      )}
    </>
  );
};

export default RecivedFriendRequesList;
