import React from "react";
import { Link } from "react-router-dom";

const AuthFailed = () => {
    return (
        <div className="h-screen w-screen bg-gray-50 flex md:items-center pt-40 md:pt-0 items-start">
            <div className="container flex flex-col md:flex-row items-center justify-between md:px-5 text-gray-700">
                <div className="pl-2 absolute z-20 w-full lg:w-1/2">
                    <div className="text-7xl text-[#4467c9] font-dark font-extrabold mb-2 md:mb-8">501</div>
                    <div className="text-[#2b51b9] font-bold text-2xl md:text-3xl leading-normal mb-8">
                        Authentication Failed
                    </div>

                    <div className="flex space-x-5 md:space-x-10 h-full w-full">
                        <div className="h-fit">
                            <Link style={{ textDecoration: "none" }} to="/" className="px-3 py-3 text-sm h-fit w-full font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#5070ca] active:opacity-80">Login To Authenticate</Link>
                        </div>
                        <div className="h-fit">
                            <Link style={{ textDecoration: "none" }} to="/signup" className="px-3 py-3 text-sm h-fit w-full font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#5070ca] active:opacity-80">Home Page</Link>
                        </div>
                    </div>
                </div>
                <div className="absolute md:z-0 opacity-80 md:opacity-100 md:static w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                    <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" className="" alt="Page not found" />
                </div>

            </div>
        </div>
    )
}

export default AuthFailed;