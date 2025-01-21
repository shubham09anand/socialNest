import React from "react"

const SettingAnimation = () => {
     return (
          <div className="w-full space-y-5 px-3 pt-3 py-20">
               <div className="animate-pulse w-fit space-x-10 flex">
                    {[...Array(2)].map((_, index) => (
                         <div key={index} className="p-3 w-fit h-fit border-4 rounded-full bg-gray-300/90 ">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="md:w-12 md:h-12 w-8 h-8 fill-gray-400">
                                   <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"></path>
                                   <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" ></path>
                              </svg>
                         </div>
                    ))}
               </div>
               <div className="border-2 border-gray-500w-full h-[1px]"></div>
               {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse w-full sm:flex sm:space-x-10 ">
                         <div className="w-full -space-y-1">
                              <div className="h-2.5 rounded-sm w-full bg-gray-300/90"></div>
                              <div className="h-8 mt-1 bg-gray-300/90 rounded w-full" placeholder="Jhon" required />
                         </div>
                         {(index % 2 === 0 && window.innerWidth >= 640) && (
                              <div className="w-full -space-y-1">
                                   <div className="h-2.5 rounded-sm w-full bg-gray-300/90"></div>
                                   <div className="h-8 mt-1 bg-gray-300/90 rounded w-full" placeholder="Jhon" required />
                              </div>
                         )}
                         {window.innerWidth >= 640 && (
                              <div className="w-full -space-y-1">
                                   <div className="h-2.5 rounded-sm w-full bg-gray-300/90"></div>
                                   <div className="h-8 mt-1 bg-gray-300/90 rounde w-full" placeholder="Jhon" required />
                              </div>
                         )}
                    </div>
               ))}
               <div className="animate-pulse w-full sm:flex sm:space-x-10">
                    <div className="w-full -space-y-1">
                         <div className="h-2.5 rounded-sm w-full bg-gray-300/90"></div>
                         <div className="h-24 mt-1 bg-gray-300/90 rounded w-full" placeholder="Jhon" required />
                    </div>
               </div>
               <div className="animate-pulse w-60 h-10 rounded-md bg-gray-300/90"></div>
          </div>
     )
}

export default SettingAnimation