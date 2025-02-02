import React from 'react';
import { Link } from "react-router-dom";

const GroupHeaderInfo = ({ display, setDisplay, groupInfo, groupName, groupDesc, isLoading }) => {
     
     const groupIcon = 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png';

     return (
          <div className="flex fixed w-full lg:w-[80%] right-0 lg:-mt-2 bg-white items-center justify-between gap-2 px-3 z-50 border-b border-gray-400 py-2 example">
               <div className="flex space-x-4 place-content-center items-center text-start pb-0 text-sm">
                    <Link to="/message" className="p-1 hover:opacity-80 shadow-[1px_1px_black]" style={{ backgroundColor: "#556eaf", borderRadius: "100%" }}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="white" className="-translate-x-[1px] w-5 sm:w-6 h-5 sm:h-6 active:opacity-60 cursor-pointer rounded-full">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                         </svg>
                    </Link>
                    {
                         isLoading ? (
                              <div className='animate-pulse  flex place-content-center items-center space-x-3'>
                                   <img src={groupIcon} style={{ border: "1px solid gray" }} className="select-none w-10 h-10 rounded-full shadow object-contain" alt="group avatar" />
                              </div>
                         ) : (
                              <Link className="flex place-content-center items-center space-x-3" style={{ textDecoration: "none" }}>
                                   <img src={groupInfo.groupIcon || groupIcon} onError={(e) => { e.target.src = groupIcon }} style={{ border: "1px solid gray" }} className="select-none w-11 h-11 rounded-full shadow object-contain" alt="group avatar" />
                                   <div>
                                        <div className="text-base font-medium text-black">{groupName}</div>
                                        <div style={{ textDecoration: 'none' }} className='flex space-x-2 place-content-center items-center'>
                                             <div className="text-gray-700 text-sm">{groupDesc}</div>
                                        </div>
                                   </div>
                              </Link>
                         )
                    }
               </div>
               <div className='flex space-x-5'>
                    <div onClick={() => display === 1 ? setDisplay(0) : setDisplay(1)} className='relative cursor-pointer active:opacity-60 bg-[#708fe3] rounded-full p-2 scale-90' title='scheduled messages'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="w-7 h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                         </svg>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-3 h-3 absolute bottom-2 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
                              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                         </svg>
                    </div>
                    <div onClick={() => display === 2 ? setDisplay(0) : setDisplay(2)} className='relative cursor-pointer active:opacity-60 bg-[#708fe3] rounded-full p-2 scale-90' title='scheduled messages'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                         </svg>
                    </div>
               </div>

          </div>
     );
};

export default React.memo(GroupHeaderInfo);