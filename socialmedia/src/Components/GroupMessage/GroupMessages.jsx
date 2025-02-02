import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GroupMessages = ({groupedMessages,message}) => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     return (
          <>
               <div className='space-y- w-full'>
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
                                        <Link style={{textDecoration: 'none'}} to={`/searched-person/${mess?.senderId}`}>
                                             <div className='select-none flex place-content-center items-center rounded-full w-8 h-8 bg-gray-800 text-white'>
                                                  <div className='pb-0.5 w-fit h-fit select-none'>{mess?.senderMessage?.[0]?.firstName?.[0] || mess?.senderMessage?.firstName?.[0]}</div>
                                             </div>
                                        </Link>
                                        {(mess?.message) && (
                                             <div className={`select-none relative rounded-[15px] w-fit ${mess?.senderId === userId ? 'bg-white text-black shadow-[1px_2px_1px_gray]' : 'bg-white shadow-[1px_1px_1px_1px_gray]'}`}>
                                                  <div className='px-3 pt-2 text-green-800 font-sans text-xs font-bold'>{mess?.senderMessage[0]?.firstName || mess?.senderMessage?.firstName} {mess?.senderMessage[0]?.lastName || mess?.senderMessage?.lastName}</div>
                                                  <div className='px-3 font-sans pt-.5 pb-.5 ml-auto' style={{ lineHeight: "120%" }}>{index} {mess?.message}</div>
                                                  <div className='px-3 text-[10px] italic font-semibold tracking-widest pt-1.5 pb-2.5'>{moment(mess?.createdAt).format('h:mm a')}</div>
                                             </div>
                                        )}
                                        {(mess?.messagePhoto.length > 0) && (
                                             <div className={`select-none relative rounded-[15px] w-80 ${mess?.senderId === userId ? 'bg-white text-black' : 'bg-white'}`}>
                                                  <div className='px-3 pt-2 text-green-800 font-sans text-xs font-bold'>{mess?.senderMessage[0]?.firstName || mess?.senderMessage?.firstName} {mess?.senderMessage[0]?.lastName || mess?.senderMessage?.lastName}</div>
                                                  <img src={mess?.messagePhoto[0]?.base64 || postImagErr} alt={postImagErr} onError={(e) => e.target.src = postImagErr} className='pt-1 object-cover w-full h-44 rounded-md' />
                                                  <div className='px-3 text-[10px] italic font-semibold tracking-widest pt-1.5 pb-2.5'>{moment(mess?.createdAt).format('h:mm a')}</div>
                                             </div>
                                        )}
                                   </div>
                              ))}
                         </div>
                    ))}
               </div>
               {(message?.data?.length === 0) &&
                    <div className='flex flex-col place-content-center items-center h-full'>
                         <div className='p-2.5 rounded-full border-[1px] border-black scale-x-[120%]'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=".5" stroke="currentColor" className="size-24 mt-2 scale-x-[80%]">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                              </svg>
                         </div>
                         <div className='text-black font-thin text-center'>No Message</div>
                    </div>
               }
          </>
     )
}

export default GroupMessages