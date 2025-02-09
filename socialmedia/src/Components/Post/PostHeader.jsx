import React from 'react';
import noProfilePicture from '../../Assets/NoProileImage.png';
import Deveplores from "../Deveplores";
import { Link } from "react-router-dom";

const PostHeader = ({ profilePhoto, post }) => {

     const colorArray = ['#dc2d28', '#5069aa', '#f06937', '#eb6946', '#6eb4f5', '#197378', '#64508c'];

     return (
          <div key={post?._id} style={{ textDecoration: "none" }} className="flex gap-3 pl-0 text-sm font-medium">
               <Link style={{ textDecoration: 'none' }} to={`/searched-person/${post?.userId}`} className='rounded-full h-fit w-fit'>
                    {!profilePhoto && (
                         <div className="border-0 text-white border-gray-600 text-center flex place-content-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full text-xl md:text-3xl" style={{ backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)] }}>{post?.postMakerDetails?.firstName[0] || "U"}</div>
                    )}
                    {profilePhoto?.map((photo, index) => (
                         <>
                              {photo?.userId === post?.userId &&
                                   <img key={index+post?._id} src={photo?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile" style={{ border: '2px solid black' }} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover" />
                              }
                         </>
                    ))}
               </Link>
               <div className="h-fit flex-1 place-content-center items-center">
                    <h4 className={`font-semibold text-black ${(post?.postMakerDetails?.userName === '@shubham' || post?.postMakerDetails?.userName === 'shubham09anand') ? 'text-sm' : 'mt-2 md:text-lg'}`}>
                         {post?.postMakerDetails?.firstName} {post?.postMakerDetails?.lastName}
                         <div className='w-fit flex place-content-center items-center text-xs font-thin md:text-sm'>
                              <div className='mr-3'>{post?.postMakerDetails?.userName}</div>
                              {(post?.postMakerDetails?.userName === '@shubham' || post?.postMakerDetails?.userName === 'shubham09anand') && (<Deveplores size={3} />)}
                         </div>
                    </h4>
               </div>
          </div>
     )
}

export default PostHeader