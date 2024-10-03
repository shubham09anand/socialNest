import React from 'react'

const storyLoadingAnimation = () => {
     return (
          <div className="w-full mt-10 sm:w-1/2 md:w-1/3 mx-auto h-[90%] lg:shadow-xl example relative">
               <div className="animate-pulse w-full h-full mx-auto bg-gray-300 p-3 relative example">
                    <div style={{ textDecoration: "none" }} className=" z-10 top-4 left-2 space-x-4 backdrop-blur-sm w-full flex">
                         <div className='w-full space-y-3'>
                              <div className='w-14 h-14 bg-gray-600 rounded-full'></div>
                              <div className='space-y-1'>
                                   <div className="w-11/12 h-3 bg-slate-800 rounded-full"></div>
                                   <div className="w-1/2 h-3 bg-slate-600 rounded-full"></div>
                              </div>
                         </div>
                    </div>
                    <div>
                         <div className="h-full relative example">
                              <div className='space-y-1 mt-[125%] z-10 bottom-5'>
                                   <div className='flex space-x-3'>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                   </div>
                                   <div className='flex space-x-3'>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                   </div>
                                   <div className='flex space-x-3'>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                   </div>
                                   <div className='flex space-x-3'>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                        <div className="text-lg rounded-lg text-white backdrop-blur-sm h-3 bg-gray-900 bottom-2 w-full"></div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default storyLoadingAnimation