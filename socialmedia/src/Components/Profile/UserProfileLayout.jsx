import React from 'react'
import Post from '../Post/Post';

const UserProfileLayout = () => {

     return (
          <>
               <div className='lg:mt-5 w-full lg:w-[80%] overflow-x-hidden ll:p-5 lg:absolute right-0 z-10'>
                    <div className='md:flex mt-2'>
                         <Post />
                    </div>
               </div>
          </>
     )
}
export default UserProfileLayout