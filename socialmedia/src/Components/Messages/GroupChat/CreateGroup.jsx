import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noProfilePicture from '../../../Assets/NoProileImage.png';

const CreateGroup = ({ displayModal }) => {

     const [image, setImage] = useState(null);
     const [warning, setWarning] = useState(false);
     const [groupName, setGroupName] = useState("");
     const [groupDesc, setGroupDesc] = useState("");

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

          if (file && allowedTypes.includes(file.type) && file.size < 10 * 1024 * 1024) {
               const reader = new FileReader();

               reader.onloadend = () => {
                    // Convert the file to base64 string
                    const base64String = reader.result;
                    setImage(base64String);
               };

               reader.readAsDataURL(file);
          } else {
               setWarning(true);
          }
     };

     return (
          displayModal && (
               <div className='absolute top-0 w-full h-full bg-white'>
                    <ToastContainer />
                    <div className='mx-auto duration-150'>
                         <div className="rounded-lg mx-auto max-w-3xl" data-id="1" data-v0-t="card">
                              <div className="flex flex-col space-y-1.5 p-6" data-id="2">
                                   <h3 className="text-2xl font-semibold leading-none tracking-tight" data-id="3">Create New Group</h3>
                              </div>
                              <div className="p-6 pt-0 space-y-4" data-id="5">
                                   <div className="">
                                        <div className='flex items-center space-x-6'>
                                             <div className="shrink-0 border-2 border-black rounded-full w-fit h-fit">
                                                  <img className="h-16 w-16 object-scale-down rounded-full" onError={(e) => { e.target.src = noProfilePicture }} src={image || noProfilePicture} alt="Group profile photo" />
                                             </div>
                                             <label className="block">
                                                  <span className="sr-only">Choose group profile photo</span>
                                                  <input onChange={(e) => handleImageChange(e)} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                                             </label>
                                        </div>
                                        <div className={`text-xs pl-24 -mt-2 text-red-500 italic ${!warning ? 'hidden' : 'block'}`}>Only JEPG, JPG, PNG are allowed with having less than 10Mb in size,</div>
                                   </div>
                                   <div className="items-center">
                                        <label className="text-sm font-semibold text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[200px]" htmlFor="group_name">Group Name</label>
                                        <input onChange={(e)=> setGroupName(e.target.value)} value={groupName} className="flex h-10 w-full rounded-md text-gray-900 outline-none border-2 border-gray-400 pl-2 py-2 text-sm" id="group_name" placeholder="Enter group name" />
                                   </div>
                                   <div className="items-center">
                                        <label className="text-sm font-semibold text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[200px]" htmlFor="group_description">Group Description</label>
                                        <input onChange={(e)=> setGroupDesc(e.target.value)} value={groupDesc} className="flex h-10 w-full rounded-md text-gray-900 outline-none border-2 border-gray-400 pl-2 py-2 text-sm" id="group_description" placeholder="Enter group description" type="text" />
                                   </div>
                                   <button disabled={false} className={`px-4 py-2 bg-[#708fe3] font-semibold text-white rounded-full`}>{true ? 'Creating.....': 'Create'}</button>
                              </div>
                         </div>
                    </div>
               </div>
          )
     );
};

export default CreateGroup;
