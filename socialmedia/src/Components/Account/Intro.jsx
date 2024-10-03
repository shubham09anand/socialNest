import React from "react";

import message from '../../Assets/images/icons/message.png';
import blog from '../../Assets/images/icons/blog.png';
import friends from '../../Assets/images/icons/group-2.png';
import post from '../../Assets/images/icons/post.png';
import story from '../../Assets/images/icons/story.jpg';
import news from '../../Assets/images/icons/news.png';
import aiText from '../../Assets/images/icons/aitext.png';
import responsive from '../../Assets/images/icons/responsive.png';
import socialNest from '../../Assets/images/socialNest.png';

const Intro = () => {

    return (
        <div id="carouselExampleControls" className="hidden lg:block carousel slide w-full" data-ride="carousel">

            <div className="carousel-inner rounded-xl">

            <div className="carousel-item active bg-white h-full">
                <div className="pt-32 space-y-4 mx-auto w-full text-center h-[550px] text-gray-900 inrto rounded-xl border border-gray-100 shadow">
                        <img src={socialNest} alt="" className="w-32 h-32 mx-auto border-4 border-black" />
                        <div className="text-6xl font-extrabold">Social<span className="text-[#6e8de0]">Nest</span></div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Chat</span>
                        </div>
                        <img src={message} alt="" className="w-20 h-20 mx-auto border-4 border-black" />
                        <div role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With Your <span className="font-extrabold font-signature1">Friends</span> and <span className="font-extrabold font-signature1">Family</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chat With New people</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Image Format <span className="font-extrabold font-signature1">(jpeg, jpg, svg , png , webp)</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Support Different type of Document Format <span className="font-extrabold font-signature1">(word, pdf, powepoint, html , css , javascript and many more)</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Schedule Message</span>
                        </div>
                        <div className='bg-gradient-to-r mt-4 to-blue-500 via-blue-600 from-blue-900 w-fit relative cursor-help mx-auto rounded-full p-2 scale-90' title='scheduled messages'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="w-20 h-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-6 h-6 absolute bottom-0 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>
                        <div role="list" className="mt-96 pt-10 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span><span className="font-extrabold font-signature1 uppercase">Schedule A Message</span> For Future Referneces</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Now Send <span className="font-extrabold font-signature1 uppercase">Birthday Wishes And Other <span className="font-extrabold font-signature1 uppercase">Timing Related Message</span></span> With More Accuracy</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>You Have To Just Give The Time And Date And Message. When The Time Arrived The Message Will Be Send.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Text-to-Text</span>
                        </div>
                        <img src={aiText} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Don't Know What to Message <span className="font-extrabold font-signature1 uppercase">Ask AI</span> For Help</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Genrate <span className="font-extrabold font-signature"> Custom Message </span> With <span className="font-extrabold font-signature">AI</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Make Friends</span>
                        </div>
                        <img src={friends} alt="" className="w-20 h-20 mx-auto border-4 border-black bg-white shadow-2xl" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Make New <span className="font-extrabold font-signature1 uppercase">Friends</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Stay in Touch With Your Friends</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-3xl font-extrabold">Create Your Blog And Read Other Blogs</span>
                        </div>
                        <img src={blog} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Create <span className="font-extrabold font-signature1 uppercase">Blog/Articles</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Your <span className="font-extrabold font-signature1 uppercase"><span className="font-extrabold font-signature1 uppercase">Views, Experinces</span> With Others</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Read Other People Blogs</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Create Your Post</span>
                        </div>
                        <img src={post} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Highlits of Your <span className="font-extrabold font-signature1 uppercase">Life , Experinces , Achivements And Other Milestones</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Create Your Story</span>
                        </div>
                        <img src={story} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Share Highlits of <span className="font-extrabold font-signature1 uppercase">Day</span> as <span className="font-extrabold font-signature1 uppercase">Story</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Set Duration For How Long You Want to Keep Your Story <span className="font-extrabold font-signature1 uppercase">(24 hrs , 12 hrs , 6 hrs , 3 hrs)</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">Read News</span>
                        </div>
                        <img src={news} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Read <span className="font-extrabold font-signature1 uppercase">News</span> On Different Topics</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carousel-item bg-white h-full">
                    <div className="pt-16 space-y-4 mx-auto w-full text-center h-[550px]  text-gray-900 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-300 rounded-xl border border-gray-100 shadow">
                        <div className="flex justify-center items-baseline">
                            <span className="mr-2 text-5xl font-extrabold">User Friendly UI</span>
                        </div>
                        <img src={responsive} alt="" className="w-20 h-20 mx-auto border-4 border-black rounded-full bg-white shadow-2xl object-fill" />
                        <div role="list" className="mt-96 pt-20 space-y-4 text-left ml-5 pr-5">
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span> <span className="font-extrabold font-signature1 uppercase">Responsive</span> And <span className="font-extrabold font-signature1 uppercase">Compatible</span> Accross All Device</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-white bg-green-500 flex place-content-center items-center rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Easy To <span className="font-extrabold font-signature1 uppercase">Navigate </span> And <span className="font-extrabold font-signature1 uppercase">Access Differnet Features</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a onClick={() => console.log("Clicked!")} id="next-Button" className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Intro;