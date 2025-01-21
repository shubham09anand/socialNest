import React, { useState, useEffect } from 'react';
import GroupHeaderInfo from './GroupHeaderInfo';
import GroupScheduledMessage from './GroupScheduledMessage';
import GroupMessageDisplay from './GroupMessageDisplay';
import GroupInfo from './GroupInfo';
import API from '../../Services/API';
import GroupPostDisplay from '../CommunityPost/GroupPostDisplay';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const GroupMessage = () => {

     const sender_id = useSelector((state) => state.LoginSlice.loggedUserId);
     const navigate = useNavigate();
     const { groupId } = useParams();
     const [display, setDisplay] = useState(0);
     const [expand, setExpand] = useState(null);

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
          queryFn: getGroupInfo,
          queryKey: ['groupInfo', groupId],
          enabled: !!groupId,
          staleTime: Infinity,
     });

     return (
          <div className='w-full overflow-hidden lg:w-[80%] lg:mt-10 lg:absolute right-0 border-l-2'>
               <GroupHeaderInfo setDisplay={setDisplay} display={display} groupInfo={data?.groupInfo?.[0] || {}} groupName={data?.groupInfo?.groupName} totalMember={data?.groupInfo?.members?.length} groupDesc={data?.groupInfo[0]?.groupDesc} isLoading={isLoading} />
               <div className='flex h-full w-full md:h-[780px]'>
                    <GroupMessageDisplay expand={expand} setExpand={setExpand} />
                    <GroupPostDisplay groupAdmins={data?.groupInfo[0]?.groupAdmins} ownerId={data?.groupInfo[0]?.ownerID} expand={expand} setExpand={setExpand}/>
               </div>
               <div className='w-full flex'>

                    <div className='w-1/2'>
                         {display === 1 && (
                              <GroupScheduledMessage setDisplay={setDisplay} display={display} />
                         )}
                         {display === 2 && (
                              <GroupInfo setDisplay={setDisplay} display={display} groupAdmin={data?.groupInfo[0]?.groupAdmins} ownerId={data?.groupInfo[0]?.ownerID} totalMember={data?.groupInfo?.members?.length} isLoading={isLoading} groupInfo={data?.groupInfo?.[0] || {}} />
                         )}
                    </div>
               </div>
          </div>
     )
}

export default GroupMessage