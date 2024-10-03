import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import moment from "moment/moment";
import LoadindBlogCard from "../Animation/LoadindBlogCard";
import API from "../../Services/API";
import noProfilePicture from '../../Assets/NoProileImage.png';

const BlogPage = () => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const [article, setArticle] = useState();
     const [error, setError] = useState();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          API.get("/getArticle")
               .then((res) => {
                    setArticle(res.data.article);
                    setLoading(false);
               })
               .catch((error) => {
                    setError(error);
                    setLoading(false);
               });
     }, []);

     return (
          <div className="no-underline space-y-4 w-full overflow-y-scroll example">
               {loading || error ? (
                    <div>
                         <LoadindBlogCard />
                         <LoadindBlogCard />
                         <LoadindBlogCard />
                         <LoadindBlogCard />
                    </div>
               ) : (
                    article?.map((record) => (
                         <div key={record._id} className="w-full p-2 flex gap-10 active:opacity-60 no-underline">
                              <div title={"Read " + record.articleTitle} className="no-underline flex flex-col justify-center">
                                   <div className="relative flex flex-col md:flex-row md:space-x-5 md:pl-5 space-y-3 md:space-y-0 pb-2 border-b w-full md:max-w-3xl mx-auto bg-white">

                                        {record?.articlePhotos && record?.articlePhotos !== null ? (<img src={record?.articlePhotos || postImagErr} onError={(e) => e.target.src = postImagErr} alt="imgErr" className="w-full h-60 md:w-3/4 rounded-lg" />) : null}

                                        <Link to={`/blog/ReadContent/${encodeURIComponent(record.articleTitle)}/${record._id}`} style={{ textDecoration: "none" }} className={`relative bg-white flex flex-col justify-between space-y-2 ${record?.articlePhotos && record?.articlePhotos === null ? 'w-full md:w-2/3' : 'w-full'}`}>
                                             <div className={`overflow-hidden ${record?.articlePhotos && record?.articlePhotos === null ? 'h-full' : 'max-h-44'}`}>
                                                  <h3 className="font-black text-gray-800 md:text-3xl text-2xl">{record?.articleTitle}</h3>
                                                  <p className="md:text-base text-gray-500 text-sm hyphens-manual overflow-hidden text-justify">{record?.paragraphs[0].content}</p>
                                             </div>
                                             <div className="flex space-x-3 place-content-center items-center w-fit">
                                                  <img src={record?.authorDetalis.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="WriterPic" className="w-10 h-10 rounded-full object-contain" style={{ border: "2px solid black" }} />
                                                  <div className="text-xs font-bold" style={{ color: 'black' }}>
                                                       <div>{record?.writerdata[0].firstName}  {record?.writerdata[0].lastName}</div>
                                                       <div>{moment(record?.createdAt).format("DD-MM-YYYY")}</div>
                                                  </div>
                                             </div>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    ))
               )}
               {article?.length === 0 && <div className="text-gray-400 text-center">No Blog Avilabe</div>}
          </div>
     );
};

export default BlogPage;