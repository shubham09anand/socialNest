import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazy-load';
import Slider from "react-slick";
import { Settings } from './PostFunction';

const PostContent = ({ post }) => {

    const divRef = useRef(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';

    useEffect(() => {
        const checkScroll = () => {
            if (divRef.current) {
                setHasScroll(divRef.current.scrollHeight > divRef.current.clientHeight);
            }
        };
        checkScroll();
    }, [post]);

    return (
        <>
            <div aria-expanded={isExpanded}>
                {post?.postPhoto?.length > 0 && (
                    <div className="relative w-full sm:px-4 p-1">
                        {post?.postPhoto?.length > 1 ? (
                            <Slider {...Settings}>
                                {post?.postPhoto?.map((pic, position) => (
                                    <LazyLoad className="flex" key={position}>
                                        <img src={pic || postImagErr} onError={(e) => (e.target.src = postImagErr)} alt="Post" className="sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md"/>
                                    </LazyLoad>
                                ))}
                            </Slider>
                        ) : (
                            <LazyLoad className="flex">
                                <img src={post?.postPhoto[0] || postImagErr} onError={(e) => (e.target.src = postImagErr)} alt="Post" className="sm:rounded-lg border-2 border-black w-full lg:h-96 h-full object-contain rounded-md"/>
                            </LazyLoad>
                        )}
                    </div>
                )}

                {post?.message && (
                    <>
                        <div ref={divRef} className={`overflow-scroll example my-2 animate duration-1000 ${isExpanded ? "h-fit" : "max-h-20" } ` + (post?.postPhoto?.length !== 0 ? "text-sm sm:text-base" : post.message.length < 50 ? "text-2xl sm:text-2xl font-extrabold" : post.message.length < 150 ? "text-xl sm:text-xl font-bold" : "text-lg sm:text-lg")}>
                            {post?.message}
                        </div>
                    </>
                )}

                {hasScroll && (
                    <p className="text-xs cursor-pointer text-gray-500 font-bold" onClick={() => setIsExpanded((prev) => !prev)}>
                        {isExpanded ? "Show Less" : "Show More"}
                    </p>
                )}

                <div className="flex justify-between place-content-center items-center">
                    <div className="text-xs pt-1 text-gray-800"> {moment(post.createdAt).format("D MMMM YYYY")},{" "} {moment(post.createdAt).format("h:mm A")}</div>
                </div>
            </div>

            <div className="flex gap-x-5 pl-0 mt-1">
                {post.postTags && post.postTags.map((tag, index) => (
                        <div key={index} className="font-extrabold text-xs sm:text-normal font-mono p-1 px-2 rounded-full border border-gray-100 mt-2">
                            {tag}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default PostContent;
