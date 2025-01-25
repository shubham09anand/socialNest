import React from 'react';
import API from '../../Services/API';
import { useMutation, useQuery } from '@tanstack/react-query';

const JoinRequestButton = ({ userId, groupId }) => {

     const sendJoingReq = async ({ requesterId, groupId }) => {
          if (requesterId && groupId) {
               const response = await API.post('/groupJoing', { requesterId, groupId });
               return response.data;
          }
     };

     const { mutate: JoingReq } = useMutation({
          mutationFn: ({ requesterId, groupId }) => sendJoingReq({ requesterId, groupId }),
          onSuccess: (data) => {
               console.log('Join Request Sent:', data);
          },
          onError: (error) => {
               console.error('Error sending join request:', error);
          },
     });

     const checkRequestStatus = async ({ requesterId, groupId }) => {
          const response = await API.post('/checkReuestStatus', { userId: requesterId, groupId: groupId });
          return response.data;
     };

     const { data: requestStatus, isLoading: isRequestStatusLoading, isError: isRequestStatusError } = useQuery({
          queryKey: ['checkRequestStatus', userId, groupId],
          queryFn: () => checkRequestStatus({ requesterId: userId, groupId: groupId }),
          enabled: !!userId && !!groupId,
          staleTime: Infinity,
     });

     return (
          <div className="join-request-button">
               {(!isRequestStatusLoading && requestStatus?.success && requestStatus?.requested) &&
                    <div className="text-white font-semibold w-fit px-4 py-1 rounded-md bg-blue-700 hover:opacity-80 active:opacity-35 cursor-pointer">Requested</div>
               }

               {(!isRequestStatusLoading && !requestStatus?.requested) &&
                    <div onClick={() => JoingReq({ requesterId: userId, groupId })} className="text-white font-semibold w-fit px-4 py-1 rounded-md bg-green-700 hover:opacity-80 active:opacity-35 cursor-pointer">Join</div>
               }
          </div>
     );
};

export default JoinRequestButton;
