import React from 'react'

const LoadingNewsAnimation = () => {
     return (
          <div className='w-full md:w-[30%] m-2 justify-between'>
               <div role="status" className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6">
                    <div className="flex items-center justify-center h-40 md:h-60 mb-4 bg-gray-600 rounded">
                         <svg className="opacity-95 w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                         </svg>
                    </div>
                    <div role="status" className="space-y-2.5 animate-pulse">
                         <div className="flex items-center w-full max-w-[400px]">
                              <div className="h-2.5 bg-pink-500 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-teal-400 rounded-full w-80"></div>
                              <div className="h-2.5 ms-2 bg-indigo-300 rounded-full w-full"></div>
                         </div>

                         <div className="flex items-center w-full max-w-[480px]">
                              <div className="h-2.5 ms-2 bg-gray-400 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-brown-500 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-lime-300 rounded-full w-24"></div>
                         </div>

                         <div className="flex items-center w-full">
                              <div className="h-2.5 bg-purple-500 rounded-full w-32"></div>
                              <div className="h-2.5 ms-2 bg-yellow-400 rounded-full w-24"></div>
                              <div className="h-2.5 ms-2 bg-green-600 rounded-full w-full"></div>
                         </div>
                         <div className="flex items-center w-full max-w-[480px]">
                              <div className="h-2.5 bg-blue-300 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-red-700 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-indigo-400 rounded-full w-24"></div>
                         </div>
                         <div className="flex items-center w-full">
                              <div className="h-2.5 bg-orange-400 rounded-full w-32"></div>
                              <div className="h-2.5 ms-2 bg-pink-600 rounded-full w-24"></div>
                              <div className="h-2.5 ms-2 bg-teal-300 rounded-full w-full"></div>
                         </div>
                         <div className="flex items-center w-full max-w-[480px]">
                              <div className="h-2.5 bg-indigo-500 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-yellow-600 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-red-400 rounded-full w-24"></div>
                         </div>
                         <div className="flex items-center w-full">
                              <div className="h-2.5 bg-purple-500 rounded-full w-32"></div>
                              <div className="h-2.5 ms-2 bg-yellow-400 rounded-full w-24"></div>
                              <div className="h-2.5 ms-2 bg-green-600 rounded-full w-full"></div>
                         </div>
                         <div className="flex items-center w-full max-w-[480px]">
                              <div className="h-2.5 bg-blue-300 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-red-700 rounded-full w-full"></div>
                              <div className="h-2.5 ms-2 bg-indigo-400 rounded-full w-24"></div>
                         </div>
                    </div>
                    <div className="flex items-center mt-4">
                         <svg className=" w-10 h-10 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                         </svg>
                         <div>
                              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                              <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
                         </div>
                    </div>
                    <span className="sr-only">Loading...</span>
               </div>
          </div>
     )
}

export default LoadingNewsAnimation