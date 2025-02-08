import React from 'react';
import StoryLoadingHomePage from '../Animation/StoryLoadingHomePage';
import API from '../../Services/API';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Story = () => {

    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';

    const getStory = async () => {
        const response = await API.post("/storyDetails");
        return response.data.storyDetails;
    };

    const { data: storyDetails, isLoading, isError } = useQuery({
        queryKey: (['getStory']),
        queryFn: getStory,
        staleTime: Infinity,
    })


    return (
        <div className='w-full border-b pl-2 xl:pt-1'>
            <div className='flex items-center'>
                <h2 className="text-2xl pb-1 sm:leading-snug tracking-wide font-bold -ml-1">Story</h2>
                {storyDetails?.length === 0 && (<p className='text-center text-gray-300 ml-5'>No active stories</p>)}
            </div>

            {storyDetails?.length === 0 && (<div className='text-lg text-gray-400 text-center pb-2'>No active stories</div>)}
            
            <div className="w-full h-fit overflow-y-hidden overflow-x-scroll example">
                {isLoading ? (
                    <div className='flex gap-x-5'>
                        <StoryLoadingHomePage />
                        <StoryLoadingHomePage />
                        <StoryLoadingHomePage />
                        <StoryLoadingHomePage />
                        <StoryLoadingHomePage />
                    </div>
                ) : (
                    <>
                        {storyDetails?.length > 0 ? (
                            <ul className="flex w-full h-fit md:h-28 overflow-x-scroll example gap-x-8">
                                {storyDetails?.map((story) => (
                                    <Link style={{ textDecoration: "none" }} to={`/story/view-story/${encodeURIComponent(story?._id)}`} key={story?._id} className="flex flex-col space-y-1 rounded-full mb-4 md:pb-5">
                                        <div className="relative rounded-full">
                                            <div className="flex gap-5">
                                                <li className="duration-300">
                                                    <div className="md:w-16 md:h-16 w-16 h-16 relative rounded-full p-0.5 border-[3px] border-[#6e8ddf]">
                                                        <img src={story?.stories[0]?.storyPhoto[0] || postImagErr} onError={(e) => e.target.src = postImagErr} alt="userStory" className="w-full h-full border-[#6e8ddf] object-cover rounded-full" />
                                                        <div className='md:w-20 pt-2 truncate text-xs'>{story?.storyUserDetails[0]?.firstName + " " + story?.storyUserDetails[0]?.lastName}</div>
                                                    </div>
                                                </li>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                        ) : (
                            null
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Story;
