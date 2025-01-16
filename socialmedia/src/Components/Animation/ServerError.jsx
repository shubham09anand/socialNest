import React from 'react';
import ServerErrorImg from '../../Assets/images/serverError.webp'

const ServerError = ({width, height, paddingTop}) => {
     return (
          <div className={`pt-${paddingTop} select-none`}>
               <img src={ServerErrorImg} alt="server error" className={`w-${width} h-${height} mx-auto`} />
               <div className='text-[14px] text-center text-gray-500 font-thin'>Someting Went Wrong</div>
          </div>
     )
}

export default ServerError