import React from 'react';

const LoadChat = ({ isLoading }) => {
     return (
          <div className={`${isLoading ? 'space-y-4' : 'space-y-5 md:space-y-3'} pt-0 p-2`}>
               {[...Array(4)].map((_, index) => (
                    <div key={index} className={`w-full ${index % 2 === 0 ? '' : ''} ${isLoading ? 'space-y-4' : ''}`}>
                         <div role="status" className={`flex w-full sm:w-1/2 md:w-3/5 lg:w-2/5 xl:w-1/3 justify-between animatePulseChat ${index % 2 === 0 ? '' : 'ml-auto'}`}>
                              <div className="flex-shrink-0">
                                   <span className="shadow-[.5px_.5px_.5px_black] flex justify-center items-center bg-gray-200/90 rounded-full w-9 h-9"></span>
                              </div>
                              <div className={`ml-4 w-full ${isLoading ? 'mt-2' : 'mt-0'}`}>
                                   <div className='flex space-x-2'>
                                        <p className={`h-[14px] bg-gray-200/90 opacity-50 rounded-full w-full md:w-72 shadow-[.5px_.5px_.5px_black] ${isLoading ? 'mb-2.5' : 'mb-1'}`}></p>
                                        <p className={`h-[14px] bg-gray-200/90 opacity-50 rounded-full w-full md:w-72 shadow-[.5px_.5px_.5px_black] ${isLoading ? 'mb-2.5' : 'mb-1'}`}></p>
                                   </div>
                                   <div className='flex space-x-2'>
                                        <p className={`h-[14px] bg-gray-200/90 opacity-50 rounded-full shadow-[.5px_.5px_.5px_black] w-3/4 md:w-64 ${isLoading ? 'mb-2.5' : 'mb-1'}`}></p>
                                        <p className={`h-[14px] bg-gray-200/90 opacity-50 rounded-full shadow-[.5px_.5px_.5px_black] w-3/4 md:w-64 ${isLoading ? 'mb-2.5' : 'mb-1'}`}></p>
                                        <p className={`h-[14px] bg-gray-200/90 opacity-50 rounded-full shadow-[.5px_.5px_.5px_black] w-3/4 md:w-64 ${isLoading ? 'mb-2.5' : 'mb-1'}`}></p>
                                   </div>
                              </div>
                         </div>
                         {isLoading && (
                              <div role="status" className={`flex justify-between w-full sm:max-w-sm rounded-lg ${index % 2 === 0 ? '' : 'ml-auto'}`}>
                                   <div className={`flex-shrink-0 ${index % 2 === 0 ? '' : 'ml-.5'}`}>
                                        <span className="flex justify-center items-center bg-gray-200/90 rounded-full shadow-[.5px_.5px_.5px_black] w-9 h-9"></span>
                                   </div>
                                   <div className="ml-4 animatePulseChat-pulse w-full bg-gray-200/90 shadow-[.5px_.5px_.5px_black] h-24 rounded-lg flex justify-center items-center">
                                        <svg className="w-8 h-8 stroke-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z" stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" ></path>
                                        </svg>
                                   </div>
                              </div>
                         )}
                    </div>
               ))}
          </div>
     );
};

export default LoadChat;
