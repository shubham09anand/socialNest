import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import GroupDescription from './GroupDescription';
import GroupJoinigRequest from './GroupJoinigRequest';
import GroupMember from './GroupMember';
import { useSelector } from 'react-redux';

const GroupInfo = ({ display, groupInfo, totalMember, groupAdmin, ownerId }) => {

     const [warning, setWarning] = useState(false);
     const [listDisplay, setListDisplay] = useState(true);
     const loggedUserId = useSelector((state) => state.LoginSlice.loggedUserId)

     return (

          <>
               <div className={`overflow-y-scroll border-black h-[calc(100%-40px)] sm:h-[calc(100%-149px)] md:h-screen border-l bg-white fixed right-0 top-[60px] lg:top-28 z-30 pb-16 transition-all duration-[1s] overflow-hidden ${display === 2 ? " w-full sm:w-2/3 md:w-2/4 lg:w-[40%] xl:w-[27%]" : "w-0"}`}>

                    {warning && <div className='flex-shrink-0 text-lg text-center font-thin bg-red-600 text-white w-full absolute z-20 py-2'>Something Went Wrong</div>}

                    <GroupDescription setWarning={setWarning} listDisplay={listDisplay} setListDisplay={setListDisplay} groupInfo={groupInfo} loggedUserId={loggedUserId} />

                    <div className='flex'>

                         <div className={`flex-shrink-0 w-full duration-500 ${listDisplay ? 'translate-x-0' : '-translate-x-full'}`}>
                              <GroupMember ownerId={ownerId} groupAdmin={groupAdmin} setWarning={setWarning} totalMember={totalMember} />
                         </div>

                         <div className={`flex-shrink-0 w-full duration-500 ${listDisplay ? 'translate-x-0' : '-translate-x-full'}`}>
                              <GroupJoinigRequest warning={warning} setWarning={setWarning} />
                         </div>

                    </div>

               </div>
          </>
     )
}

export default GroupInfo;