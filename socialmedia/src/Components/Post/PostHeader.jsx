import React from 'react';
import noProfilePicture from '../../Assets/NoProileImage.png';
import Deveplores from "../Deveplores";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
     return (
          <div key={post?._id} style={{ textDecoration: "none" }} className="flex gap-3 pl-0 p-2.5 text-sm font-medium">
               <Link to={`/searched-person/${post?.userId}`} className='rounded-full h-fit w-fit border-[3px] border-black'>
                    <img src={post?.postMaker?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="Profile" className="w-12 h-12 md:w-14 md:h-14 border-2 border-black rounded-full object-cover" />
               </Link>
               <div className="h-fit flex-1 place-content-center items-center">
                    <h4 className={`font-semibold text-black ${(post?.userSignupInfo?.userName === '@shubham' || post?.userSignupInfo?.userName === 'shubham09anand') ? 'text-sm' : 'mt-2 md:text-lg'}`}>
                         {post?.userSignupInfo?.firstName} {post?.userSignupInfo?.lastName}
                         <div className='w-fit -mt-1 flex place-content-center items-center text-xs font-thin md:text-sm'>
                              <span className='mr-3'>{post?.userSignupInfo?.userName}</span>
                         </div>
                         {(post?.userSignupInfo?.userName === '@shubham' || post?.userSignupInfo?.userName === 'shubham09anand') && (<Deveplores size={3} />)}
                    </h4>
               </div>
          </div>
     )
}

export default PostHeader