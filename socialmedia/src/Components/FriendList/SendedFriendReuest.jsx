import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../Assets/NoProileImage.png';
import API from '../../Services/API';

const SendedFriendReuest = () => {

  const userId = useSelector((state) => state.LoginSlice.loggedUserId);
  const [sendedRequest, setSendedRequest] = useState([]);
  const [action, setAction] = useState(true); // Controls loading animation
  const [button, setButton] = useState(false);

  useEffect(() => {
    const fetchSendedRequest = async () => {
      try {
        const response = await API.post('/sendedRequest', { userId: userId });
        setSendedRequest(response.data);
        setAction(false);
      } catch (error) {
        console.error('Error:', error);
        setAction(false);
      }
    };

    fetchSendedRequest();
  }, [userId]);

  const handleCancle = async (reciverId) => {
    setButton(true);
    try {
      const response = await API.post('/deleteSendedRequest', { senderId: userId, reciverId: reciverId });
      if (response.data.status === 1) {
        setSendedRequest((prev) => ({...prev,
          FriendRequestList: prev.FriendRequestList.filter(
            (friend) => friend.reciverProfile[0]._id !== reciverId
          ),
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setButton(false);
    }
  };

  return (
    <>
      <div className="w-full border-b mt-4 flex place-content-center items-center space-x-5 pb-2">
        <div className='text-3xl font-extralight'>Requested</div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </div>
      </div>
      <div className="w-full px-2">
        {action ? (
          <>
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
            <FriendProfileLoadingAnimation />
          </>
        ) : sendedRequest?.FriendRequestList?.length > 0 ? (
          <ul className="w-full divide-y divide-gray-200 pt-2">
            {sendedRequest.FriendRequestList.map((request, index) => (
              <div key={index} className="lg:px-40 py-3 pb-0 flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between place-content-center items-center">
                <Link style={{ textDecoration: "none" }} to={`/searched-person/${request._id}`} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <img className="w-16 h-16 object-contain rounded-full border-black"
                      style={{ border: '3px solid black' }}
                      src={request?.senderPhoto[0]?.profilePhoto || noProfilePicture}
                      onError={(e) => e.target.src = noProfilePicture}
                      alt="Profile avatar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 truncate text-lg w-40">
                      {request?.reciverProfile[0]?.firstName} {request?.reciverProfile[0]?.lastName}
                    </div>
                    <p className="text-sm text-gray-700 truncate">{request?.reciverProfile[0]?.userName}</p>
                  </div>
                </Link>
                <button disabled={button} onClick={() => handleCancle(request.reciverProfile[0]._id)} className={`bg-red-600 text-white cursor-pointer select-none active:opacity-75 rounded-sm font-medium px-4 py-1 mt-4 w-fit h-fit ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  Cancel
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <div className="mt-6 text-center text-gray-500">No requests Sent. Be alone, Die Alone !!!</div>
        )}
      </div>
    </>
  );
};

export default SendedFriendReuest;
