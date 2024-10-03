import React from 'react'

const LoadindBlogCard = () => {
     return (
          <div className='scale-95'>
               <div className="mb-2 flex flex-col gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.1" stroke="gray" className="w-64 h-64 animate-pulse">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <div className="flex flex-col flex-1 gap-5 sm:p-2">
                         <div className="flex flex-col flex-1 gap-3">
                              <div className="w-96 bg-gray-200 animate-pulse h-14 rounded-2xl">
                              </div>
                              <div className="w-96 h-3 bg-gray-200 animate-pulse rounded-2xl">
                              </div>
                              <div className="w-96 h-3 bg-gray-200 animate-pulse rounded-2xl">
                              </div>
                              <div className="w-96 h-3 bg-gray-200 animate-pulse rounded-2xl">
                              </div>
                              <div className="w-96 h-3 bg-gray-200 animate-pulse rounded-2xl">
                              </div>
                         </div>
                         <div className="flex gap-3 mt-auto">
                              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                              </div>
                              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse">
                              </div>
                              <div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse">
                              </div>
                         </div>
                    </div>
               </div>

          </div>
     )
}

export default LoadindBlogCard