import React, { useState } from 'react';
import FriendProfileLoadingAnimation from "../../Animation/FriendProfileLoadingAnimation";
import noProfilePicture from '../../../Assets/NoProileImage.png';
import ServerError from '../../Animation/ServerError';
import { getGroupMember, removeMember, makeMoreAdmin, removeAdmin } from './GroupChatFunctions';
import { useMutation, useQuery, useQueryClient, useIsMutating } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GroupMember = ({ setWarning, totalMember, ownerId, groupAdmin }) => {

     const queryClient = useQueryClient();
     const { groupId } = useParams();
     const [option, setOption] = useState(null);
     const loggedUserId = useSelector((state) => state.LoginSlice.loggedUserId)

     const { data, isLoading, isError } = useQuery({
          queryKey: ['groupMemberList', groupId],
          queryFn: () => getGroupMember(groupId),
          enabled: !!groupId,
          staleTime: Infinity,
          cacheTime: 1000 * 60 * 10,
     });

     const { mutate: handleRemoveMember } = useMutation({
          mutationKey: (['removeMemeber']),
          mutationFn: ({ groupId, userId }) => removeMember({ groupId, userId }),
          onSuccess: (data, _) => {
               if (data.status === 200) {
                    setOption(null);
                    queryClient.invalidateQueries(['groupMemberList']);
               }
          },
          onError: () => {
               setWarning(true)
               setTimeout(() => {
                    setWarning(false)
               }, 5000);
          },
     });

     const { mutate: handleMakeMoreAdmin } = useMutation({
          mutationFn: ({ groupId, newAdminId }) => makeMoreAdmin({ groupId, newAdminId }),
          mutationKey: (['makeMoreAdmin']),
          onSuccess: (data, _) => {
               if (data.status === 200) {
                    setOption(null);
                    queryClient.invalidateQueries(['groupMemberList']);
               } else {
               }
          },
          onError: () => {
               setWarning(true)
               setTimeout(() => {
                    setWarning(false)
               }, 5000);
          },
     })

     const { mutate: handleRemoveAdmin } = useMutation({
          mutationFn: ({ groupId, userId }) => removeAdmin({ groupId, userId }),
          mutationKey: (['removeAdmin']),
          onSuccess: (data, _) => {
               if (data.status === 200) {
                    setOption(null);
                    queryClient.invalidateQueries(['groupMemberList']);
               } else {
               }
          },
          onError: () => {
               setWarning(true)
               setTimeout(() => {
                    setWarning(false)
               }, 5000);
          },
     })

     const isRemoving = useIsMutating({ mutationKey: ['removeMemeber'] });
     const isPromoting = useIsMutating({ mutationKey: ['makeMoreAdmin'] });
     const isDemoting = useIsMutating({ mutationKey: ['removeAdmin'] });

     return (
          <>
               <div className='flex justify-between mt-4'>
                    <div className='flex space-x-2 items-center'>
                         <div className='flex-shrink-0 text-lg font-semibold pl-2 cursor-pointer select-none'>Group Members</div>
                         <div className='w-1 h-1 rounded-full border-3 mt-1 bg-gray-700 border-gray-700'></div>
                         <div className='text-sm text-gray-600 mt-1'>{totalMember} Members</div>
                    </div>
               </div>

               {isLoading ? (
                    <>
                         {[...Array(8)].map((_, index) => (
                              <FriendProfileLoadingAnimation key={index} />
                         ))}
                    </>
               ) :
                    <ul className="w-full pb-2 sm:pl-2">
                         {data?.data?.members?.map((items, index) => (
                              <li key={index} className={`relative flex items-center pb-2 pt-2 space-x-2 sm:space-x-4 ${option === null || option === index ? 'opacity-100' : 'opacity-30'}`}>
                                   <div className='h-fit w-fit border-[1px] border-gray-900 rounded-full '>
                                        <img className="flex-shrink-0 cursor-pointer w-12 h-12 object-cover rounded-full " src={items?.profileDetails?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="User avatar" />
                                   </div>
                                   <div className="flex-1">
                                        <h3 className="text-base font-medium text-gray-900">{items?.firstName} {items?.lastName}</h3>
                                        <p className="text-gray-700 text-xs">{items?.userName}</p>
                                   </div>
                                   {
                                        option === index && (
                                             <div className='bg-white select-none absolute right-10 sm:right-12 top-2 w-fit h-fit divide-y divide-gray-700 px-2 border shadow-[2px_2px_2px_black] rounded-lg'>
                                                  {(loggedUserId === ownerId) && (
                                                       <button disabled={isRemoving} onClick={() => handleRemoveMember({ groupId: groupId, userId: items._id })} className={`flex space-x-2 sm:space-x-4 py-1 hover:opacity-75 active:opacity-50 items-center w-full ${isRemoving ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                            <div className='text-sm font-semibold sm:text-base'>Remove</div>
                                                       </button>
                                                  )}
                                                  {(loggedUserId === ownerId || !groupAdmin?.includes(items._id)) && !groupAdmin?.includes(items._id) && (
                                                       <button disabled={isPromoting} onClick={() => handleMakeMoreAdmin({ groupId: groupId, newAdminId: items._id })} className={`flex space-x-2 sm:space-x-4 py-1 hover:opacity-75 active:opacity-50 items-center ${isPromoting ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                            </svg>
                                                            <div className='text-sm font-semibold sm:text-base'>Make Admin</div>
                                                       </button>
                                                  )}
                                                  {(loggedUserId === ownerId) && groupAdmin?.includes(items._id) && (
                                                       <button disabled={isDemoting} onClick={() => handleRemoveAdmin({ groupId: groupId, userId: items._id })} className={`flex space-x-2 sm:space-x-4 py-1 hover:opacity-75 active:opacity-50 items-center ${isDemoting ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                            </svg>
                                                            <div className='text-sm font-semibold sm:text-base'>Make Member</div>
                                                       </button>
                                                  )}
                                             </div>
                                        )
                                   }
                                   <div className='flex space-x-2 mr-3 italic select-none'>
                                        {items?._id === ownerId && (<div className='text-xs font-semibold text-gray-600 px-2 py-1 bg-gray-200 rounded-lg'>Owner</div>)}
                                        {items?._id === loggedUserId && (<div className='text-xs font-semibold text-gray-600 px-2 py-1 bg-gray-200 rounded-lg'>You</div>)}
                                        {groupAdmin?.includes(items?._id) && (<div className='text-xs font-semibold text-gray-600 px-2 py-1 bg-gray-200 rounded-lg mr-[45px]'>Admin</div>)}
                                   </div>

                                   {(loggedUserId === ownerId || groupAdmin?.includes(loggedUserId)) && items?._id !== ownerId && items?._id !== loggedUserId && (
                                        <div onClick={() => option === null ? setOption(index) : option === index ? setOption(null) : setOption(index)} className={`px-1 py-1 absolute top-3 right-2 rounded-full cursor-pointer hover:opacity-50 active:opacity-35 ${index === option ? 'bg-[#708fe3]' : ''}`}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="3" stroke={option === null ? '#708fe3' : '#708fe3'} className="size-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                             </svg>
                                        </div>
                                   )}
                              </li>
                         ))}
                    </ul>
               }

               {
                    isError && (
                         <ServerError width={2 / 5} height={28} paddingTop={10} />
                    )
               }
          </>
     )
}

export default GroupMember