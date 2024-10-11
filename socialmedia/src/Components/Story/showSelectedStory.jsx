import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import StoryLoadingAnimation from "../Animation/storyLoadingAnimation";
import API from "../../Services/API";
import noProfilePicture from '../../Assets/NoProileImage.png';
import Deveplores from "../Deveplores";

const ShowSelectedStory = () => {

    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
    const [error, setError] = useState(null);
    const [selectedStory, setSelectedStory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { storyId } = useParams();
    const [index, setIndex] = useState(0);
    const [instructionDisplay, setInstructionDisplay] = useState(true)
    const [isLongTouch, setIsLongTouch] = useState(true);
    const longPressTimeoutRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setInstructionDisplay(false)
        }, 3000);
    })

    const getTimeDiff = (postTime) => {
        const currentDate = new Date();
        const postDate = new Date(postTime);
        const timeDifferenceInMilliseconds = currentDate - postDate;
        return timeDifferenceInMilliseconds / (1000 * 60 * 60);
    };

    const filterActiveStories = (storyDetails) => {
        return storyDetails.map((detail) => {
            const filteredPhotos = [];
            const filteredMessages = [];

            detail.stories.forEach((storyItem) => {
                const storyHrs = getTimeDiff(storyItem.postCreationTime);
                const duration = storyItem.duration;

                if (storyHrs < duration) {
                    filteredPhotos.push(storyItem.storyPhoto[0]);
                    filteredMessages.push(storyItem.storyMessage);
                }
            });

            if (filteredPhotos.length > 0) {
                return {
                    userId: detail.userId,
                    userPhoto: detail.userPhoto,
                    userDetails: detail.storyUserDetalis,
                    storyPhoto: filteredPhotos,
                    storyMessage: filteredMessages,
                };
            } else {
                return null;
            }
        }).filter(Boolean);
    };

    useEffect(() => {
        API.get(`/getSelectedStory?storyId=${storyId}`)
            .then((res) => {
                const storyData = res.data;
                if (storyData && storyData.storyDetails) {
                    const activeStories = filterActiveStories(storyData.storyDetails);
                    setSelectedStory(activeStories);
                }

                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
        // eslint-disable-next-line
    }, [storyId]);

    // Start long press timer
    const startLongPress = () => {
        longPressTimeoutRef.current = setTimeout(() => {
            setIsLongTouch(false);
        }, 500);
    };

    // Clear long press timer
    const endLongPress = () => {
        clearTimeout(longPressTimeoutRef.current);
        setIsLongTouch(true);
    };

    const handleMouseDown = () => {
        startLongPress();
    };

    const handleMouseUp = () => {
        endLongPress();
        setIndex((index + 1) % selectedStory[0]?.storyPhoto.length);
    };

    const handleTouchStart = () => {
        startLongPress();
    };

    const handleTouchEnd = () => {
        endLongPress();
        setIndex((index + 1) % selectedStory[0]?.storyPhoto.length);
    };

    return (
        <div className="lg:mt-2 pt-4 w-screen h-screen fixed overflow-y-scroll left-0 top-0 z-20 bg-black/80 lg:pt-8 example">
            {isLoading && <StoryLoadingAnimation />}
            {!isLoading && !error && selectedStory.length > 0 && (
                <>
                    {selectedStory[0]?.storyPhoto.length > 0 && (
                        <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="lg:w-[30%] flex-col place-content-center items-center h-full mx-auto relative">
                            {instructionDisplay && selectedStory[0]?.storyPhoto.length > 1 &&
                                (
                                    <div className="mx-auto w-fit">
                                        <div className={`absolute top-[40%] left-[40%] mx-auto z-30`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-hand-index-thumb-fill w-16 h-16 swing-hand opacity-75 " viewBox="0 0 16 16">
                                                <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0" />
                                            </svg>
                                            <div className="text-2xl pl-2 pt-2 text-gray-800 font-semibold">Swipe</div>
                                        </div>
                                    </div>
                                )
                            }
                            {isLongTouch && (
                                <div className="absolute z-20 lg:pt-7 top-0 backdrop-blur-xl w-full flex items-center">
                                    <Link to='/home' className="active:bg-gray-300 w-fit p-2 h-fit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                        </svg>
                                    </Link>
                                    <div className="flex gap-x-5">
                                        <Link to={`/searched-person/${selectedStory[0]?.userId}`} style={{ textDecoration: "none", color: "black" }}>
                                            <img src={selectedStory[0]?.userPhoto[0].profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} className="h-14 w-14 rounded-full border-white object-contain bg-white" alt="ImgErr" style={{ border: "solid 2px" }} />
                                        </Link>
                                        <div>
                                            <div className="text-white text-sm">{selectedStory[0]?.userDetails[0].firstName}{" "}{selectedStory[0]?.userDetails[0].lastName}</div>
                                            <div className="text-white text-xs -mt-0.5">{selectedStory[0]?.userDetails[0].userName}</div>
                                            {(selectedStory[0]?.userDetails[0].userName === '@shubham' || selectedStory[0]?.userDetails[0].userName === 'shubham09anand') && (<Deveplores size={3} story={true} />)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="w-full relative">
                                <div className="w-full h-full">
                                    {selectedStory[0]?.storyPhoto[index] && (
                                        <img className="w-full h-full object-contain" src={selectedStory[0]?.storyPhoto[index] || postImagErr} onError={(e) => e.target.src = postImagErr} alt="imgErr" />
                                    )}
                                </div>
                            </div>


                            {isLongTouch && (
                                <div className={`p-2 pr-2 overflow-y-scrollw-full example ${selectedStory[0]?.storyPhoto[index] ? 'absolute bottom-32 text-xl h-fit text-gray-100  ':'text-3xl text-center bg-slate-100 h-96 flex place-content-center items-center '}`}>
                                    {selectedStory[0]?.storyMessage[index]}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ShowSelectedStory;
