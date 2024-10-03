import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageNotFoundPSVG from "../../Assets/images/page not found.svg"

const PageNotFound = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '404 - Page Not Found';
    }, []);
    return (
        <section className="bg-white">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-blue-500">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-500">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>
                    <div className="flex items-center mt-6 gap-x-3">
                        <button onClick={() => navigate(-1)} className="flex items-center place-content-center justify-center py-1 px-4 text-white rounded-md bg-black space-x-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Go back</span>
                        </button>

                        <button onClick={() => navigate('/')}  className="flex items-center place-content-center justify-center py-1 px-4 text-white rounded-md bg-black space-x-5">
                            Take me home
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img className="w-full max-w-lg lg:mx-auto" src={PageNotFoundPSVG} alt="ImggErr" />
                </div>
            </div>
        </section>
    )
}

export default PageNotFound;