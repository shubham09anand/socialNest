import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SettingsOptions = () => {

     const userId =  useSelector((state) => (state.LoginSlice.loggedUserId));
     
     return (
          <aside id="logo-sidebar" className="w-full lg:w-[80%] lg:p-2 lg:absolute right-0 pt-[35px] lg:pt-[30px]" aria-label="Sidebar">
               <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="font-medium">
                         <div className='text-3xl font-bold mb-2'>Setting</div>
                         <Link to={`/searched-person/${userId}`} style={{ textDecoration: "none" }} className='border-b flex items-center cursor-pointer hover:bg-slate-100 active:opacity-50 group py-2'>
                              <div className="flex items-center py-2 text-gray-900 rounded-lg group">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                   </svg>
                                   <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                              </div>
                         </Link>
                         <Link to="/update-password" style={{ textDecoration: "none" }} className='border-b flex items-center cursor-pointer hover:bg-slate-100 active:opacity-50 group py-2'>
                              <div className="flex items-center py-2 text-gray-900 rounded-lg group">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900">
                                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                   </svg>
                                   <span className="flex-1 ms-3 whitespace-nowrap">Change Password</span>
                              </div>
                         </Link>
                         <Link to="/update-profile" style={{ textDecoration: "none" }} className='border-b flex items-center cursor-pointer hover:bg-slate-100 active:opacity-50 group py-2'>
                              <div className="flex items-center py-2 pl-1.5 text-gray-900 rounded-lg group">
                                   <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                   </svg>
                                   <span className="flex-1 ms-3 whitespace-nowrap">Edit Profile</span>
                              </div>
                         </Link>
                         <Link to="/update-profile" style={{ textDecoration: "none" }} className='hidden border-b items-center cursor-pointer hover:bg-slate-100 active:opacity-50 group py-2'>
                              <div className="flex items-center py-2 text-gray-900 rounded-lg group">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900">
                                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                   </svg>
                                   <span className="flex-1 ms-3 whitespace-nowrap">Account Activity</span>
                              </div>
                         </Link>
                    </ul>
               </div>
          </aside>
     )
}

export default React.memo(SettingsOptions)