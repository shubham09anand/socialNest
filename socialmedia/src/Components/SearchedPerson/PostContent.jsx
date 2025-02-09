import React from 'react';
import Slider from "react-slick";

const PostContent = ({post}) => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';

     const settings = {
          arrows: true,
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
     };

     return (
          <div>
               {post?.postPhoto.length > 1 &&
                    <Slider {...settings}>
                         {post?.postPhoto?.map((src, index) => (

                              <div key={index} className="relative w-full lg:h-96 h-full sm:px-4">
                                   <img src={src || postImagErr} onError={(e) => e.target.src = postImagErr} alt="" className="sm:rounded-lg border-2 border-black w-full h-full object-contain rounded-md" />
                              </div>
                         ))}
                    </Slider>
               }
               {post?.postPhoto.length === 1 &&
                    <>
                         {post?.postPhoto?.map((src, index) => (

                              <div key={index} className="relative w-full lg:h-96 h-full sm:px-4">
                                   <img src={src || postImagErr} onError={(e) => e.target.src = postImagErr} alt="" className="sm:rounded-lg border-2 border-black w-full h-full object-contain rounded-md" />
                              </div>
                         ))}
                    </>
               }
               {post?.message && <div className={'overflow-scroll example my-2 rounded-xl max-h-20 overflow-y-scroll ' + (post?.postPhoto.length !== 0 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl font-extrabold')}>{post.message}</div>}
          </div>
     )
}

export default PostContent