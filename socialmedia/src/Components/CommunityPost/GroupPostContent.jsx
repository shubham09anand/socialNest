import React from 'react';
import moment from 'moment';
import Deveplores from "../Deveplores";
import noProfilePicture from '../../Assets/NoProileImage.png';

const GroupPostHeader = ({ items, profilePhoto }) => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];

     return (
          <div className='w-full'>
               <div className='flex place-content-center items-center w-fit space-x-5 mb-3'>
                    {Array.isArray(profilePhoto) &&
                         profilePhoto.map((pic) => (
                              items?.userId === pic?.userId && (
                                   <img style={{ border: '1px black solid' }} key={pic?.userId} src={pic.profilePhoto || noProfilePicture} onError={(e)=> e.target.src = noProfilePicture} className="object-cover h-14 w-14 rounded-full" alt="" />
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
                         {(items?.userDetails[0]?.userName === '@shubham' || items?.userDetails[0]?.userName === 'shubham09anand') && (<Deveplores size={3}/>)}
                    </div>
               </div>

               {(items?.postPhoto?.length !== 0) && (
                    <>
                         {items?.postPhoto?.map((pic, index) => (
                              <img key={index} src={pic || postImagErr} onError={(e)=> e.target.src = postImagErr} alt='' className='mb-2 shrink-0 mx-auto object-contain shadow-[2px_2px_2px_gray] rounded-lg h-72 w-fit' />
                         ))}
                    </>
               )}

               <div className={`${items?.postPhoto?.length === 0 ? '-mt-2' : 'pt-3'} -ml-4 text-base font-thin pl-4 h-fit max-h-28 overflow-y-scroll`}>{items?.postMessage} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, at!0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae commodi debitis, a, sit, similique expedita sint eligendi porro et sequi mollitia dolores aliquid provident deserunt facere tenetur ab veritatis eaque!</div>
               
               <div className='-ml-4 text-[12px] font-semibold pl-4 pt-2'>{moment(items?.createdAt).format('DD MMMM `YY')}</div>
          </div>
     );
};

export default GroupPostHeader;