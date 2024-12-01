import React, { useState } from 'react'
import FriendProfileLoadingAnimation from "../../Animation/FriendProfileLoadingAnimation";
import CreateGroupImg from "../../../Assets/images/icons/makeGroup.png";
import CreateGroup from './CreateGroup';

const GroupList = () => {

     const [displayModal, setDisplayModal] = useState(false);

     return (
          <>
               <div className="py-3 w-full h-screen">
                    <div className="divide-y divide-gray-200">
                         {[...Array(4)].map((_, index) => (
                              <button key={index} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                                   <div className="flex items-center gap-4">
                                        <div className='relative w-14 h-14 shrink-0 border-2 rounded-full border-black overflow-hidden'>
                                             <img className="object-contain w-full h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScoe-yq2n7mjxBwuBXRtG49NzWy5JG2Vf2LQ&s" width="32" height="32" alt="Marie Zulfikar" />
                                        </div>
                                        <div>
                                             <h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                                             <div className="text-[13px]">The video chat ended · 2hrs</div>
                                        </div>
                                   </div>
                              </button>
                         ))}
                    </div>
               </div>

               <CreateGroup displayModal={displayModal} />

               <div onClick={() => displayModal ? setDisplayModal(false) : setDisplayModal(true)}  className='cursor-pointer fixed right-5 bottom-[calc(100%-650px)] bg-[#637ac7] flex place-content-center items-center space-x-2 w-fit h-fit rounded-full py-1 px-4 text-white font-semibold tracking-wider '>
                    <div>Create Group</div>
                    <div className='relative rounded-full p-1'>
                         <img src={CreateGroupImg} alt="addGroup" className='w-7 h-7 rounded-full' />
                    </div>
               </div>
          </>
     )
}

export default GroupList