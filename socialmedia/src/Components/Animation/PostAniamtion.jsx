import React from 'react'

const PostAniamtion = () => {
     return (
          <div>
               <div role="status" className="space-y-4 my-4 animate-pulse md:items-center w-full p-2 mb-3">
                    <div className="sm:pl-0 flex items-center">
                         <svg className="w-10 h-10 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                         </svg>
                         <div>
                              <div className="h-2.5 bg-gray-500 rounded-full w-32 mb-2"></div>
                              <div className="w-36 h-2 bg-gray-700 rounded-full"></div>
                         </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-60 bg-gray-300 rounded">
                         <svg className="w-10 h-10 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                         </svg>
                    </div>
                    <div className="w-full">
                         <div role="status" className="space-y-2.5 animate-pulse w-full">
                              <div className="flex items-center w-full">
                                   <div className="h-2.5 bg-gray-300 rounded-full w-32"></div>
                                   <div className="h-2.5 ms-2 bg-gray-500 rounded-full w-24"></div>
                                   <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-full"></div>
                              </div>
                              <div className="flex items-center w-full">
                                   <div className="h-2.5 bg-gray-400 rounded-full w-full"></div>
                                   <div className="h-2.5 ms-2 bg-gray-800 rounded-full w-full"></div>
                                   <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-24"></div>
                              </div>
                              <div className="flex items-center w-full">
                                   <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                                   <div className="h-2.5 ms-2 bg-gray-800 rounded-full w-80"></div>
                                   <div className="h-2.5 ms-2 bg-gray-600 rounded-full w-full"></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                         </div>

                    </div>
                    <span className="sr-only">Loading...</span>
               </div>
          </div>
     )
}

export default PostAniamtion