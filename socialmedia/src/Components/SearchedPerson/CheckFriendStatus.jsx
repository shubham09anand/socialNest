import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const CheckFriendStatus = ({ searchedUserId }) => {
  
  const logedInPersonId = useSelector((state) => state.LoginSlice.loggedUserId);
  const [friedndstatus, setFriedndStatus] = useState(false);
  const [friedndRequeststatus, setFriedndRequeststatus] = useState(false);
  const [requestSend, setRequestSend] = useState(false)

  const sendFreindRequest = async () => {
    try {
      const response = await API.post("/sendFriendRequest", { senderId: logedInPersonId, reciverId: searchedUserId });

      if (response.data.status === 1) {
        toast.success("Friend Request Sent");
        setRequestSend(true)
      } else {
        setRequestSend(false)
        toast.info(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Something Went Wrong !!!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.post("/checkFreiendshipStatus", { person_1: logedInPersonId, person_2: searchedUserId });
        setFriedndStatus(response.data.status);

        if (!response.data.status) {
          const requestStatusResponse = await API.post("/checkFriendRequestStatus", { person_1: logedInPersonId, person_2: searchedUserId });
          setFriedndRequeststatus(requestStatusResponse.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [logedInPersonId, searchedUserId]);

  return (
    <div className='mx-auto w-full my-4'>
      <ToastContainer style={{ zIndex: "200" }} />
      {friedndstatus ? (
        <div className="w-fit mx-auto text-white bg-[#6f8fe2] select-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Friends
        </div>
      ) : friedndRequeststatus || requestSend ? (
        <div className="w-fit mx-auto cursor-pointer focus:outline-none text-white bg-gray-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Requested
        </div>
      ) : (
        <div onClick={sendFreindRequest} className="select-none cursor-pointer w-fit mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Send Friend Request
        </div>
      )}
    </div>
  );
};

export default CheckFriendStatus;