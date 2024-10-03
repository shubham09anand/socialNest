import React from 'react'

const StoryLoadingHomePage = () => {
     return (
          <div className='w-16 pb-4 flex flex-col place-content-center items-center space-y-2 animate-pulse'>
               <div className=' bg-slate-400 border-4 w-14 h-14 rounded-full flex flex-col place-content-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-9 h-9">
                         <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
               </div>
               <div className='w-14 h-1.5 bg-gray-300 rounded-full'></div>
          </div>
     )
}
export default StoryLoadingHomePage