import React, { useState } from 'react';
import moment from 'moment';
import { useMutation, useIsMutating } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { handleUpdateDesc, warning } from './GroupChatFunctions';

const GroupDescription = ({ setWarning, groupInfo, loggedUserId, listDisplay, setListDisplay }) => {

     const { groupId } = useParams();
     const groupIcon = 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png';
     const [edit, setEdit] = useState(false);
     const [option, setOption] = useState(false);
     const [editedName, setEditedName] = useState(groupInfo?.groupName);
     const [editedDesc, setEditedDesc] = useState(groupInfo?.groupDesc);

     const { mutate: updateGroupDesc } = useMutation({
          mutationKey: ['updateGroupDesc', groupId],
          mutationFn: ({ groupId, editedName, editedDesc }) => handleUpdateDesc({ groupId, editedName, editedDesc }),
          onSuccess: () => {
               alert("Group updated successfully!");
          },
          onError: () => {
               warning(setWarning, true, 5000)
          }
     });

     const isUpating = useIsMutating(['updateGroupDesc', groupId]);

     return (
          <div className="w-full relative">
               <div className="flex justify-center px-5 select-none">
                    <img className={`grayscale bg-white p-2 rounded-full ${edit ? 'h-28 w-28' : 'h-28 w-28'}`} src={groupInfo?.groupIcon || groupIcon} onError={(e) => e.target.src = groupIcon} alt="group icon" />
               </div>

               {(groupInfo?.groupAdmins === loggedUserId || groupInfo?.ownerID === loggedUserId) &&
                    <div>
                         <div onClick={() => option ? setOption(false) : setOption(true)} className='p-1 rounded-full shadow-[2px_2px_10px_gray] w-fit h-fit absolute top-2 right-2 cursor-pointer hover:opacity-90 active:opacity-75'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                              </svg>
                         </div>
                         {option && (
                              <div className="absolute top-2 right-12 border-[1px] border-gray-600 rounded-md shadow-2xl bg-white divide-y-[1px] divide-gray-600">
                                   <button onClick={() => edit ? setEdit(false) : setEdit(true)} className={`p-2 py-2 rounded-md flex space-x-2 sm:space-x-4 w-full hover:opacity-75 active:opacity-50 items-center ${false ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="size-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        <div className='font-semibold text-sm'>Edit</div>
                                   </button>
                                   <button className={`p-2 py-2 flex space-x-2 sm:space-x-4 w-full hover:opacity-75 active:opacity-50 items-center ${false ? 'cursor-wait opacity-50' : 'cursor-pointer opacity-100'}`}>
                                        <div className="w-4 h-4 flex place-content-center items-center bg-[#000000] animate-pulse rounded-full">
                                             <div className="w-3 h-3 bg-[#000000] animate-pulse rounded-full"></div>
                                        </div>
                                        <div onClick={() => listDisplay ? setListDisplay(false) : setListDisplay(true)} className='font-semibold text-sm'>Pending Joinig Request</div>
                                   </button>
                              </div>
                         )}
                    </div>
               }

               {!edit && (
                    <div className="text-center px-2 space-y-1 select-none">
                         <div className="text-gray-900 text-xl font-semibold">{groupInfo?.groupName}</div>
                         <div className="text-gray-700 text-sm">{groupInfo?.groupDesc}</div>
                    </div>
               )}

               {edit && (
                    <div className='flex flex-col items-center gap-2 p-2'>
                         <input onChange={(e) => setEditedName(e.target.value)} value={editedName} className="text-xl inline outline-none border-b-[1px] px-2 border-x-0 border-t-0 border-gray-300 focus:border-gray-600 focus:bg-gray-100 hover:bg-slate-100 text-gray-700 w-3/4 text-center focus:shadow-[2px_2px_2px_black] shadow-[1px_1px_1px_gray] bg-gray-50" placeholder='Enter new name' />
                         <textarea onChange={(e) => setEditedDesc(e.target.value)} value={editedDesc} className="text-sm inline outline-none border-b-[1px] px-2 pt-1 border-x-0 border-t-0 border-gray-300 focus:border-gray-600 focus:bg-gray-100 hover:bg-slate-100 focus:shadow-[2px_2px_2px_black] shadow-[1px_1px_1px_gray] bg-gray-50 text-gray-700 w-full focus:h-20 h-[30px] duration-500 resize-none" placeholder='Enter new description' />
                         <button onClick={() => updateGroupDesc({ groupId, editedDesc, editedName })} className={`px-5 py-1 rounded-sm bg-red-600 text-white font-semibold ${isUpating ? 'opacity-50 cursor-wait' : 'opacity-100 cursor-pointer'}`}>Edit</button>
                    </div>
               )}

               {!edit && (
                    <div className='select-none text-gray-500 italic w-fit mx-auto flex space-x-1 text-xs '>
                         <div>Created At</div>
                         <div>{moment(groupInfo?.createdAt).format('MM/DD/YYYY')}</div>
                    </div>
               )}
          </div>
     )
}

export default GroupDescription