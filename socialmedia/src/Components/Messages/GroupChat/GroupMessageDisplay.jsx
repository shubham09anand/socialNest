import React, { useState, useEffect } from 'react';
import API from '../../../Services/API';
import LoadChat from '../../Animation/LoadChat';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

const GroupMessageDisplay = () => {
     const { groupId } = useParams();
     const [message, setMessage] = useState([]);
     const [pagination, isPagination] = useState(false);

     const handleFetchMessage = async ({ pageParam = 0 }) => {
          isPagination(true);
          try {
               const response = await API.post('/fetchGroupMessage', { groupId, page: pageParam });
               return response.data;
          } catch (error) {
               isPagination(true);
          } finally {
               isPagination(false)
          }
     };

     const { data, isLoading, isError, fetchNextPage, hasNextPage, } = useInfiniteQuery({
          queryKey: ['fetchgroupmessage', groupId],
          queryFn: handleFetchMessage,
          getNextPageParam: (lastPage, allPages) => {
               if (lastPage?.data?.length) {
                    return allPages.length;
               } else {
                    return false;
               }
          },
          enabled: !!groupId,
          staleTime: Infinity,
     });

     useEffect(() => {
          if (data?.pages) {
               const allMessages = data.pages.flatMap(page => page.data);
               setMessage(allMessages);
          }
     }, [data]);

     return (
          <div className='right-0 absolute mt-[10px] pb-36 lg:pb-36 lg:mt-10 pt-14 sm:pt-16 lg:pt-8 example w-full overflow-hidden'>
               <div className='sm:pt-0'>
                    {data?.pages[0]?.totalMessages > message.length && (
                         <div className='w-fit mx-auto'>
                              <div
                                   onClick={() => fetchNextPage()}
                                   className='fixed mx-auto flex place-content-center items-center space-x-5 w-fit'>
                                   <div className='text-sm text-center text-gray-400 cursor-pointer'>
                                        {hasNextPage ? 'Load More' : 'No More Messages'}
                                   </div>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4 scale-[330%] animate-bounce">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                   </svg>
                              </div>
                         </div>
                    )}

                    {(isLoading || pagination) && (
                         <LoadChat isLoading={isLoading} />
                    )}

                    <div className='space-y-5 px-2 pt-4'>
                         {[...message].reverse().map((mess, index) => (
                              <div key={index} className='flex gap-3'>
                                   <div className='rounded-full pt-[2.5px] text-center w-8 h-8 bg-gray-800 text-white'>
                                        {mess?.senderMessage[0]?.firstName[0]}
                                   </div>
                                   <div className={`relative px-4 rounded-[15px] max-w-2xl ${true ? 'bg-[#708fe3] text-white shadow-[1px_2px_1px_gray]' : 'bg-gray-200'}`}>
                                        <div className='font-sans pr-3 p-1'>{mess?.message}</div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default GroupMessageDisplay;
