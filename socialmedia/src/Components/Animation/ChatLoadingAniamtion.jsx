import React from 'react'

const ChatLoadingAnimation = () => {
     return (
          <div className="w-full overflow-y-scroll xl:w-[80%] h-screen 2xl:w-[83%] xl:p-2 animate-pulse space-y-4 lg:max-w-xl mt-4">
               <div className="space-x-2 flex items-end justify-end absolute left-0 top-20 w-1/4">
                    <svg className="w-12 h-12 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div className="flex-1 space-y-4 py-1">
                         <div className="h-7 bg-gray-300 rounded-full space-y-2 px-3 py-2">
                         </div>
                    </div>
               </div>
               <div className="space-x-2 flex items-end justify-end absolute right-0 top-28 w-1/4">
                    <svg className="w-12 h-12 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div className="flex-1 space-y-4 py-1">
                         <div className="h-7 bg-gray-300 rounded-full space-y-2 px-3 py-2">
                         </div>
                    </div>
               </div>
               <div className="space-x-2 flex items-end justify-end absolute left-0 top-36 w-1/4">
                    <svg className="w-12 h-12 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div className="flex-1 space-y-4 py-1">
                         <div className="h-7 bg-gray-300 rounded-full space-y-2 px-3 py-2">
                         </div>
                    </div>
               </div>
               <div className="space-x-2 flex items-end justify-end absolute right-0 top-56 w-1/4">
                    <svg className="w-12 h-12 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div className="flex-1 space-y-4 py-1">
                         <div className="h-7 bg-gray-300 rounded-full space-y-2 px-3 py-2">
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default ChatLoadingAnimation;
