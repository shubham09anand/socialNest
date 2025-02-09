import React from 'react';
import noProfilePicture from '../../Assets/NoProileImage.png';
import { Link } from 'react-router-dom';
import Deveplores from "../Deveplores";

const ShowCommentsAndLike = ({ comments }) => {

     return (
          <div>
               <div className='mt-2 font-light mb-2'>Comments</div>
               <div className="example border-gray-200 font-normal space-y-3 relative max-h-36 overflow-y-scroll">
                    {comments?.map((comment, index) => (
                         <div key={index} className=" items-start gap-3 relative">
                              <div className="flex place-content-center items-center w-fit space-x-2">
                                   <Link style={{ color: 'black', textDecoration: 'none' }} to={`/searched-person/${comments[0]?.commenterId}`}>
                                        <img src={comments[index]?.commenterPhoto?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="imgErr" style={{ border: 'solid black 2px' }} className="w-6 h-6 mt-1 rounded-full object-contain" />
                                   </Link>
                                   <div className="text-black flex place-content-center items-center text-sm -mt-1 font-semibold">
                                        {comments[index]?.commenterProfile?.firstName} {comments[index]?.commenterProfile?.lastName}
                                        <span className='ml-4'>{(comments[index]?.commenterProfile?.userName === '@shubham' || comments[index]?.commenterProfile?.userName === 'shubham09anand') && (<Deveplores size={3} />)}</span>
                                   </div>
                              </div>
                              <p className="pl-8 -mt-1.5 text-sm sm:text-base max-h-20 overflow-y-scroll">{comment?.commentBody}</p>
                         </div>
                    ))}
                    {comments?.length === 0 && (<div className='w-full text-center text-gray-600 text-sm'>No Comments Yet...</div>)}
               </div>
          </div>
     )
}

export default React.memo(ShowCommentsAndLike)