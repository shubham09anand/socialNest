import React from 'react';

const Error = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center p-5 w-full mx-auto">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-red-100 p-4">
          <div className="rounded-full stroke-red-600 bg-red-200 p-4">
            <svg
              className="w-10 h-10 md:w-16 md:h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17 16L22 21M22 16L17 21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="text-xl my-2 text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={refreshPage}
        >
          Refresh
        </div>          
        <p className="text-slate-600 text-base lg:text-lg">
          Oops, something went wrong. Try to refresh this page.{' '}
        </p>
      </div>
    </div>
  );
};

export default Error;
