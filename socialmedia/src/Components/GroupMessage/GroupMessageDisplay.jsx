import React, { useState, useEffect } from 'react';
import API from '../../Services/API';
import LoadChat from '../Animation/LoadChat';
import moment from 'moment';
import SendGroupMessage from "./SendGroupMessage";
import GroupMessages from './GroupMessages';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const GroupMessageDisplay = ({ userDetails, expand, setExpand }) => {

     const { groupId } = useParams();
     const [page, setPage] = useState(1);
     const [totalMessage, setTotalMessage] = useState([]);

     const handleFetchMessage = async () => {
          const response = await API.post('/fetchGroupMessage', { groupId, page });
          return response.data;
     };

     const { data: message, isLoading } = useQuery({
          queryKey: ['fetchgroupmessage', page],
          queryFn: handleFetchMessage,
          enabled: !!groupId,
          staleTime: Infinity,
     });

     useEffect(() => {
          if (message?.data) {
               setTotalMessage((prev) => [...message.data, ...prev]);
          }
     }, [message]);

     const groupedMessages = totalMessage.reduce((acc, mess) => {
          const date = moment(mess?.createdAt).format('DD/MM/`YY');
          if (!acc[date]) acc[date] = [];
          acc[date].push(mess);
          return acc;
     }, {});

     return (
          <div className={`${expand ? 'w-full' : 'w-full md:w-1/2'} duration-[1s] relative left-0 w-full h-[calc(100%-90px)] pt-20 pb-32 overflow-y-scroll`}>
               {!expand && (
                    <div onClick={() => setExpand(true)} className={`${!expand ? 'right-[51%] lg:right-[41%]' : 'right-4'} hidden md:block fixed z-20 top-16 lg:top-32 rounded-[5px] shadow-[1px_1px_1px_black] p-0.5 cursor-pointer active:opacity-50 hover:opacity-75 bg-white`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                         </svg>
                    </div>
               )}
               {expand && (
                    <div onClick={() => setExpand(false)} className={`${!expand ? 'right-[51%] lg:right-[41%]' : 'right-4'} hidden md:block fixed z-20 top-16 lg:top-32 rounded-[5px] shadow-[1px_1px_1px_black] p-0.5 cursor-pointer active:opacity-50 hover:opacity-75 bg-white`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                         </svg>
                    </div>
               )}
               {(message?.data?.length !== 0 && totalMessage.length < message?.totalMessages) && (
                    <div className='w-fit mx-auto'>
                         <div onClick={() => setPage((prev) => prev + 1)} className='fixed mx-auto flex place-content-center items-center space-x-5 w-fit cursor-pointer'>
                              <div className='text-sm text-center text-gray-400'>More Messages</div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4 scale-[330%] animate-bounce">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                              </svg>
                         </div>
                    </div>
               )}

               {isLoading && <LoadChat isLoading={isLoading} />}

               <GroupMessages groupedMessages={groupedMessages} message={message} />

               <SendGroupMessage userDetails={userDetails} expand={expand} totalMessage={totalMessage} setTotalMessage={setTotalMessage} />
          </div>
     );
};

export default GroupMessageDisplay;
