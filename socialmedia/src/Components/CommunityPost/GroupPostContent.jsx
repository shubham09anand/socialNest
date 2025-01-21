import moment from 'moment';
import React from 'react';

const GroupPostHeader = ({ items, profilePhoto }) => {

     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];

     return (
          <div className='w-full'>
               <div className='flex place-content-center items-center w-fit space-x-5 mb-3'>
                    {Array.isArray(profilePhoto) &&
                         profilePhoto.map((pic) => (
                              items?.userId === pic?.userId && (
                                   <img style={{ border: '1px black solid' }} key={pic?.userId} src={pic.profilePhoto} className="object-cover h-10 w-10 rounded-full" alt="" />
                              )
                         ))}

                    {(!profilePhoto || profilePhoto.length === 0) && (
                         <div className="border-[1px] text-white border-gray-600 text-center pt-.5 object-contain h-8 w-8 rounded-full font-semibold text-lg" style={{ backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)] }}>{items?.userDetails[0]?.firstName?.[0] || "U"}</div>
                    )}

                    <div className="ml-3">
                         <span className="text-sm font-semibold antialiased block leading-tight">
                              {items?.userDetails[0]?.firstName || "First Name"} {items?.userDetails[0]?.lastName || "Last Name"}
                         </span>
                         <span className="text-gray-600 text-xs block">
                              {items?.userDetails[0]?.userName || "Username"}
                         </span>
                    </div>
               </div>

               {(items?.postPhoto?.length !== 0) && (
                    <>
                         {items?.postPhoto?.map((pic, index) => (
                              <img key={index} src={pic} alt='' className='shrink-0 mx-auto object-contain shadow-[2px_2px_2px_gray] rounded-lg h-72 w-fit' />
                         ))}
                    </>
               )}

               <div className={`${items?.postPhoto?.length === 0 ? '-mt-2' : 'pt-3'} -ml-4 text-base font-thin pl-4 h-fit max-h-20 overflow-y-scroll`}>{items?.postMessage} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, at!0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae commodi debitis, a, sit, similique expedita sint eligendi porro et sequi mollitia dolores aliquid provident deserunt facere tenetur ab veritatis eaque!</div>
               <div className='-ml-4 text-[12px] font-semibold pl-4 pt-2'>{moment(items?.createdAt).format('DD /MM /`YY HH:mm')}</div>

          </div>
     );
};

export default GroupPostHeader;