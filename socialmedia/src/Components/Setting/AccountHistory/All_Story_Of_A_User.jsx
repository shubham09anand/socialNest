import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryLoadingHomePage from '../../Animation/StoryLoadingHomePage';
import API from '../../../Services/API';

const All_Story_Of_A_User = () => {
    const { searchedUserId } = useParams();
    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
    const [storyDetails, setStoryDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [index, setIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [showStoreis, setShowStories] = useState(false)

    const getAllStoryOfSpecificUser = () => {
        if (!searchedUserId) return;

        API.post("/getAllStoryOfSpecificUser", { userId: searchedUserId, page: index, limit: 1 })
            .then((res) => {
                setStoryDetails(res.data.storyDetails);
                setTotalPages(res.data.totalPages); // Store total pages
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getAllStoryOfSpecificUser();
        // eslint-disable-next-line
    }, [index]);

    const handleNextStory = () => {
        if (index < totalPages) {
            setIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePreviousStory = () => {
        if (index > 1) {
            setIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <>
            <div className='w-full border-b pl-2 xl:pt-1 pb-2 mt-2'>
                <div className='flex items-center'>
                    <h2 className="text-2xl pb-1 sm:leading-snug tracking-wide font-bold">Your Stories</h2>
                    {storyDetails.length === 0 && !isLoading && (
                        <p className='text-center text-gray-300 ml-3 text-xs'>Not Any Stoies Yet</p>
                    )}
                </div>
                <div className="w-full h-fit overflow-y-hidden overflow-x-scroll example">
                    {isLoading ? (
                        <div className='flex gap-x-5'>
                            <StoryLoadingHomePage />
                            <StoryLoadingHomePage />
                            <StoryLoadingHomePage />
                            <StoryLoadingHomePage />
                        </div>
                    ) : (
                        <>
                            {storyDetails.length > 0 ? (
                                <ul className="flex w-full h-fit md:h-20 overflow-x-scroll example gap-x-8">
                                    {storyDetails.map((story, index) => (
                                        <div key={index} onClick={() => setShowStories(true)} className="flex flex-col space-y-1 rounded-full cursor-pointer hover:opacity-75">
                                            <div className="relative rounded-full">
                                                <div className="flex gap-5">
                                                    <li className="duration-300">
                                                        <div className="md:w-16 md:h-16 w-16 h-16 relative rounded-full p-0.5 border-[3px] border-[#6e8ddf]">
                                                            <img src={story.stories[0]?.storyPhoto[0] || postImagErr} onError={(e) => e.target.src = postImagErr} alt="userStory" className="w-full h-full border-[#6e8ddf] object-cover rounded-full" />
                                                        </div>
                                                    </li>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            ) : null}
                        </>
                    )}
                </div>
            </div>

            {showStoreis && (
                <div className='w-screen h-screen bg-black/60 top-0 left-0 fixed backdrop-blur-xl z-[100]'>
                    <div className="relative w-full backdrop-blur-lg sm:w-3/4 lg:w-3/5 mx-auto md:mt-0 example sm:mt-0">
                        <svg onClick={() => setShowStories(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="cursor-pointer z-20 left-2 top-2 absolute size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <div className="flex place-content-center items-center bg-black/40 w-full h-screen mx-auto relative example space-y-2">
                            {storyDetails.length > 0 && (
                                <div className="rounded-md relative w-full">
                                    <div className='relative w-full'>
                                        {index < totalPages && (
                                            <div onClick={handleNextStory} className='absolute right-5 top-[45%] bg-white rounded-full p-2 border-2 cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </div>
                                        )}

                                        {index > 1 && (
                                            <div onClick={handlePreviousStory} className='absolute left-5 top-[45%] bg-white rounded-full p-2 border-2 cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </div>
                                        )}
                                        {storyDetails[0]?.stories[0]?.storyPhoto[0] && (
                                            <img src={storyDetails[0]?.stories[0]?.storyPhoto[0] || postImagErr} onError={(e) => e.target.src = postImagErr} alt='imgErr' className="mb-2 object-contain w-full h-[50vh]" />
                                        )}
                                    </div>
                                    <div className={`mx-auto h-fit w-fit duration-[2s] ml-28 overflow-y-scroll text-gray-100 example ${storyDetails[0]?.stories[0]?.storyPhoto[0] ? 'max-h-20 px-10 text-center' : 'text-2xl px-28 text-center'}`}>
                                        {storyDetails[0]?.stories[0]?.storyMessage}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default All_Story_Of_A_User;
