import React, { useState, useEffect } from 'react';
import SendGroupMessage from './SendGroupMessage';
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import GroupScheduledMessage from './GroupScheduledMessage';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../../../Services/API';

const GroupMessage = () => {

     const sender_id = useSelector((state) => state.LoginSlice.loggedUserId);
     const { groupId } = useParams();
     const navigate = useNavigate();
     const [display, setDisplay] = useState(0);

     useEffect(() => {
          if (sender_id === null) {
               navigate("/message");
          }
     }, [sender_id, navigate]);

     const getGroupInfo = async () => {
          const response = await API.post('/groupInfo', { groupId });
          return response.data;
     };

     const { data, isLoading } = useQuery({
          queryKey: ['groupInfo', groupId],
          queryFn: getGroupInfo,
          enabled: !!groupId,
          staleTime: Infinity,
     });

     const groupInfo = data?.groupInfo?.[0] || {};
     const groupName = groupInfo.groupName || "Unnamed Group";
     const groupDesc = data?.message || "No description available";
     const groupAdmin = data?.groupInfo[0].groupAdmins;
     const ownerId = data?.groupInfo[0].ownerID;

     return (
          <div className='w-full lg:w-[80%] lg:mt-10 lg:absolute right-0 border-l-2'>
               <GroupInfo setDisplay={setDisplay} display={display} groupInfo={groupInfo} groupName={groupName} groupDesc={groupDesc} isLoading={isLoading} />
               <SendGroupMessage />
               <GroupMembers setDisplay={setDisplay} display={display} groupAdmin={groupAdmin} ownerId={ownerId} />
               <GroupScheduledMessage setDisplay={setDisplay} display={display} />
          </div>
     )
}

export default GroupMessage