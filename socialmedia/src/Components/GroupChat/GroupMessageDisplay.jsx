import React, { useState, useEffect } from 'react';
import API from '../../Services/API';
import LoadChat from '../Animation/LoadChat';
import moment from 'moment';
import SendGroupMessage from "./SendGroupMessage";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const GroupMessageDisplay = ({ expand, setExpand }) => {
     
     const { groupId } = useParams();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     const [totalMessage, setTotalMessage] = useState([]);
     const [page, setPage] = useState(1);

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
               <div className='w-fit mx-auto'>
                    <div onClick={() => setPage((prev) => prev + 1)} className='fixed mx-auto flex place-content-center items-center space-x-5 w-fit cursor-pointer'>
                         <div className='text-sm text-center text-gray-400'>More Messages</div>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4 scale-[330%] animate-bounce">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                         </svg>
                    </div>
               </div>

               {isLoading && <LoadChat isLoading={isLoading} />}

               <div className='space-y-5 pt-4 w-full'>
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                         <div key={date}>
                              <div className='mt-2 flex flex-row-reverse select-none mx-auto px-1 w-fit h-fit rounded-md place-content-center items-center shadow-[1px_1px_1px_1px_gray]'>
                                   <div className='tracking-widest text-center font-extralight pl-2 text-xs bold rounded-lg text-gray-900 my-1 px-1'>{date}</div>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                   </svg>
                              </div>
                              {messages.map((mess, index) => (
                                   <div key={index} className={`px-2 my-3 w-full flex gap-3 ${mess.senderId === userId ? 'ml-auto flex-row-reverse' : ''}`}>
                                        <Link to={`/searched-person/${mess.senderId}`}>
                                             <div className='flex place-content-center items-center rounded-full w-8 h-8 bg-gray-800 text-white'>
                                                  <div className='w-fit h-fit'>{mess?.senderMessage?.[0]?.firstName?.[0]}</div>
                                             </div>
                                        </Link>
                                        <div className={`relative rounded-[15px] w-fit ${mess.senderId === userId ? 'bg-white text-black shadow-[1px_2px_1px_gray]' : 'bg-white shadow-[1px_1px_1px_1px_gray]'}`}>
                                             <div className='px-3 pt-2 text-green-800 font-sans text-xs font-bold'>{mess?.senderMessage[0]?.firstName} {mess?.senderMessage[0]?.lastName}</div>
                                             <div className='px-3 font-sans pt-.5 pb-.5 ml-auto' style={{ lineHeight: "120%" }}>{mess?.message}</div>
                                             <div className='px-3 text-[10px] italic font-semibold tracking-widest pt-1.5 pb-2.5'>{moment(mess?.createdAt).format('h:mm a')}</div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    ))}
               </div>
               <SendGroupMessage expand={expand} />
          </div>
     );
};

export default GroupMessageDisplay;
