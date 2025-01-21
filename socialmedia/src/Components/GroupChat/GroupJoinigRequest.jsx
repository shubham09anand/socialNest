import React from 'react';
import FriendProfileLoadingAnimation from "../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../Assets/NoProileImage.png';
import ServerError from "../Animation/ServerError"
import { useQuery, useMutation, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { pendingRequest, processRequest } from './GroupChatFunctions';

const GroupJoinigRequest = ({ setWarning }) => {

     const queryClient = useQueryClient();
     const { groupId } = useParams();

     const { data: request, isLoading, isError } = useQuery({
          queryKey: ['pendingRequest', groupId],
          queryFn: () => pendingRequest({ groupId }),
          enabled: !!groupId,
          staleTime: Infinity,
          cacheTime: 1000 * 60 * 10,
     });

     const { mutate: handleRequest } = useMutation({
          mutationKey: ['joiningRequest'],
          mutationFn: ({ groupId, action, requesterId, requestId }) => processRequest({ groupId, action, requesterId, requestId }),
          onSuccess: () => {
               queryClient.invalidateQueries(['processJoingRequest'], groupId)
          },
          onError: () => {
               setWarning(true);
               setTimeout(() => {
                    setWarning(false)
               }, 5000);
          }
     });

     const joiningRequest = useIsMutating(['joiningRequest']);

     return (
          <div className='mt-4 pl-2'>
               <div className='flex space-x-2 items-center  mb-2'>
                    <div className='flex-shrink-0 text-lg font-semibold cursor-pointer select-none'>Pending Request</div>
               </div>

               {isError && <ServerError width={60} height={32} paddingTop={10} />}

               {request?.data.length === 0 && <div className='text-lg font-thin text-gray-800 text-center py-10'>No Pending Request . . .</div>}

               {isLoading ? (
                    <>
                         {[...Array(8)].map((_, index) => (
                              <FriendProfileLoadingAnimation key={index} />
                         ))}
                    </>
               ) :
                    <ul className="w-full pb-2 pl-2">
                         {request?.data?.map((items, index) => (
                              <div key={index} className={`select-none relative flex place-content-center items-center justify-between pb-2 pt-2 space-x-4 pr-2`}>
                                   <div className='flex place-content-center items-center w-fit h-fit space-x-3 sm:space-x-5'>
                                        <div className='h-fit w-fit border-[1px] shadow-2xl border-gray-600 rounded-full '>
                                             <img className="flex-shrink-0 cursor-pointer w-14 h-14 object-cover rounded-full " src={items?.userRequesterData[1]?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="User avatar" />
                                        </div>
                                        <div className="flex-1">
                                             <h3 className="font-semibold text-base text-gray-900">{items?.userRequesterData[0]?.firstName} {items?.userRequesterData[0]?.lastName}</h3>
                                             <p className="text-gray-700 text-xs font-semibold">{items?.userRequesterData[0]?.userName}</p>
                                        </div>
                                   </div>
                                   <div className='flex space-x-5 h-fit place-content-center items-center'>
                                        <div>
                                             <div className="flex space-x-5">
                                                  <button onClick={() => handleRequest({ groupId: items?.groupId, action: 'accept', requesterId: items?.requesterId, requestId: items._id })} className={`bg-blue-600 text-white rounded-lg text-sm px-3 py-1 ${joiningRequest ? 'opacity-50 cursor-wait' : 'cursor-pointer'} w-fit h-fit`}>Accept</button>
                                                  <button onClick={() => handleRequest({ groupId: items?.groupId, action: 'reject', requesterId: items?.requesterId, requestId: items._id })} className={`bg-red-600 text-white rounded-lg text-sm px-3 py-1 ${joiningRequest ? 'opacity-50 cursor-wait' : 'cursor-pointer'} w-fit h-fit`}>Reject</button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </ul>
               }
          </div>
     )
}

export default GroupJoinigRequest