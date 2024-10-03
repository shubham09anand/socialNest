import React from "react";
import noProfilePicture from '../../Assets/NoProileImage.png';

const HeaderAnimation = () => {

    return (
        <header className="hidden lg:block fixed top-0 w-screen bg-white z-40 pt-2">
            <div className="flex justify-between place-content-center items-center w-full xl:px-6 lg:gap-5 space-x-3 px-2">
                <div className="flex space-x-2 place-content-center items-center">
                    <div className="w-10 h-10 cursor-pointer bg-gray-600 animate-pulse rounded-lg"></div>
                </div>
                <div className="w-full bg-[#f1f5f9] rounded-lg">
                    <div className="mx-auto w-full">
                        <div className="flex w-full relative space-x-3 pl-2 animate-pulse bg-slate-300 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="top-2 absolute w-6 h-6 opacity-50">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <div className="w-full pl-4 outline-none !font-normal h-10 !text-sm rounded-lg animate-pulse">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-full relative bg-secondery cursor-pointer shrink-0" tabIndex="0" aria-haspopup="true" aria-expanded="false">
                    <img src={noProfilePicture} alt="imgErr" className="sm:w-10 sm:h-10 animate-pulse w-10 h-10 object-cover rounded-full shadow shrink-0" />
                </div>
            </div>
        </header>
    );
}

export default HeaderAnimation;