import React from 'react'

const DashBoardLaoding = () => {
    return (
        <>
            {true && (
                <div className='w-42 fixed pt-10'>
                    <div id="site__sidebar" className="top-0 left-0 z-[99] mt-0 overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full">
                        <div className="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-54px)] relative z-30 max-lg:border-r">
                            <div className="pr-4" data-simplebar="init">
                                <div className="simplebar-wrapper" style={{ margin: "0px -16px 0px 0px" }}>
                                    <div className="simplebar-height-auto-observer-wrapper">
                                        <div className="simplebar-height-auto-observer"></div>
                                    </div>
                                    <div className="simplebar-mask">
                                        <div className="simplebar-offset" style={{ right: "-20px; bottom: 0px" }}>
                                            <div className="simplebar-content" style={{ padding: "0px calc(36px) 0px 0px; height: 100%; overflow: hidden scroll" }}>
                                                <nav id="side">
                                                    <ul className=''>
                                                        <div style={{ textDecoration: "none" }} to="/home" className=" rounded-lg active:opacity-60 mt-2">
                                                            <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 animate-pulse opacity-70">
                                                                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                                                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                                                </svg>

                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textDecoration: "none" }} to="/message" className=" rounded-lg active:opacity-60">
                                                            <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 animate-pulse opacity-70">
                                                                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textDecoration: "none" }} to="/friends" className=" rounded-lg active:opacity-60">
                                                            <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-people-fill w-10 h-10 animate-pulse opacity-70" viewBox="0 0 16 16">
                                                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textDecoration: "none" }} to="/news" className=" rounded-lg active:opacity-60">
                                                            <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-newspaper w-10 h-10 animate-pulse opacity-70" viewBox="0 0 16 16">
                                                                    <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z" />
                                                                    <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z" />
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textDecoration: "none" }} to="/blog" className=" rounded-lg active:opacity-60">
                                                            <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 animate-pulse opacity-70">
                                                                    <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                    </ul>
                                                </nav>
                                                <nav id="side" className="font-medium text-sm text-black border-t pt-3 mt-2">
                                                    <div className="px-3 pb-2 text-sm font-medium">
                                                        <div className="text-black"></div>
                                                    </div>
                                                    <ul className="mt-2 space-x-2" uk-nav="multiple: true">
                                                        <div style={{ textDecoration: "none" }} to='/account-setting'>
                                                            <div className='flex items-center gap-10 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 animate-pulse">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                        <div style={{ textDecoration: "none" }} className='mt-4 mx-auto cursor-pointer'>
                                                            <div className='flex items-center gap-10 px-4 capitalize'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 animate-pulse">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                                                                </svg>
                                                                <div className='w-full bg-gray-700 animate-pulse rounded-sm h-4'></div>
                                                            </div>
                                                        </div>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="simplebar-placeholder" style={{ width: "292px; height: 897px" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashBoardLaoding