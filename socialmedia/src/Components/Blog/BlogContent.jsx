import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingAnimation from "../Animation/LoadingAnimation";
import API from "../../Services/API";
import noProfilePicture from '../../Assets/NoProileImage.png';
import Err500 from '../../Assets/error500.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Deveplores from "../Deveplores";

const BlogContent = () => {

     const { id } = useParams();
     const navigator = useNavigate();
     const loggedUser = useSelector((state) => (state.LoginSlice.loggedUserId));
     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const [article, setArticle] = useState(null);
     const [error, setError] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const [imageIndex, setImageIndex] = useState(0);
     const [delteOption, setDeleteOption] = useState(null);
     const [button, setButton] = useState(false);

     useEffect(() => {
          API.get(`/getRequestedArticle/${id}`).then((res) => {
               setArticle(res.data.articleData[0]);
               setIsLoading(false);
          })
               .catch((error) => {
                    setError(error);
               })
               .finally(() => {
                    setIsLoading(false);
               });
     }, [id]);

     const deleteArticle = async (articleId) => {
          setButton(true);
          try {
               const res = await API.post("/deleteArticle", { articleId: articleId });
               console.log(res?.data)
               if (res?.data?.deletedCount === 1) {
                    toast.success("Article has Been Deleted");
                    navigator('/blog');
                    setButton(false);
               }
               else if (res?.data?.deletedCount === 0) {
                    toast.success("Someting Went Wrong")
                    setButton(false);
               }
          } catch (error) {
               toast.error("Someting Went Wrong")
          } finally {
               setButton(true);
          }
     }

     return (
          <div className="relative w-full lg:w-[80%] lg:p-5 pt-2 lg:pt-4 lg:mt-0 lg:absolute right-0">
               <ToastContainer />
               <Link to='/blog' className="bg-[#708fe3] fixed shadow-[2px_2px_2px_black] mt-10 p-1 rounded-full hidden lg:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
               </Link>
               {isLoading ? (
                    <div className="absolute right-0 w-fit"><LoadingAnimation /></div>
               ) : error ? (
                    <div className="mx-auto mt-5 lg:mt-20">
                         <img src={Err500} alt="Err500" className="border-2 border-black mb-5 w-fit h-96 mx-auto" />
                    </div>
               ) : (
                    <>
                         {article !== null && (
                              <>
                                   {article?.articlePhotos.length > 0 && (
                                        <div className="w-60 mt-20 lg:-ml-10 lg:px-1 text-xl text-gray-800 leading-normal h-fit fixed hidden lg:block">
                                             <p className="text-base font-bold py-2 lg:pb-3 pl-4 text-gray-900">Menu</p>
                                             <div className="w-full sticky inset-0 hidden h-64 lg:h-auto example md:block mt-0 shadow lg:shadow-none lg:bg-transparent z-50" style={{ top: "1em" }} id="menu-content">
                                                  <ul className="list-reset backdrop-blur-sm">
                                                       <li className="py-2 md:my-0 lg:hover:bg-transparent">
                                                            <div className="block pl-4 align-middle text-gray-700 no-underline hover:text-purple-500 border-transparent lg:hover:border-gray-400">
                                                                 {article?.paragraphs?.map(
                                                                      (paragraph, index) => (
                                                                           <div key={index} className="mb-3">
                                                                                <a className="pb-1 md:pb-0 text-sm" href={`#Introduction-${index}`}>
                                                                                     {paragraph.title}
                                                                                </a>
                                                                           </div>
                                                                      )
                                                                 )}
                                                            </div>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   )}
                                   <div className="lg:px-6 sm:mt-0">
                                        <section className="mb-32 md:p-5 w-full md:absolute right-0 lg:w-4/5 flex flex-col px-2">
                                             <div className=" space-x-5">
                                                  <h1 className="mb-4 text-5xl md:text-6xl font-extrabold mx-auto">
                                                       {article?.articleTitle}
                                                  </h1>
                                             </div>
                                             {article?.articlePhotos.length > 0 && (
                                                  <div className="relative flex justify-between">
                                                       <div className="flex mb-2">
                                                            <Link to={`/searched-person/${article?.userID}`} style={{ textDecoration: "none" }}>
                                                                 <img className="object-center object-contain border-2 border-black rounded-full h-14 w-14" style={{ border: "solid black" }} src={article?.storyUserDetalis?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="imgErr" />
                                                            </Link>
                                                            <div className="text-sm font-thin pl-2 my-auto">
                                                                 <p className="font-semibold text-sm" style={{ color: 'black' }}>{article?.storyWriterName[0].firstName}{" "}{article?.storyWriterName[0].lastName}</p>
                                                                 <div className="mb-.5 flex items-center" style={{ color: 'black' }}>
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 mr-1">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                                                      </svg>
                                                                      <p className="font-semibold text-xs mr-10 ml-2"> {moment(article?.createdAt).format("DD-MMM-YYYY")}</p>
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                      </svg>
                                                                      <span className="font-semibold text-xs ml-2"> {moment(article?.createdAt).format("hh:mm A")}</span>
                                                                 </div>
                                                                 {(article?.storyWriterName[0].userName === '@shubham' || article?.storyWriterName[0].userName === 'shubham09anand') && (<Deveplores size={3} />)}
                                                            </div>
                                                       </div>

                                                       {loggedUser === article?.userID && (
                                                            <div className={`flex place-content-center items-center relative pr-3 lg:pr-5 backdrop-blur-3xl ${button ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                                 <div className={`absolute -left-60 backdrop-blur-2xl flex w-56 h-fit bg-white items-center place-content-center space-x-3 pl-0 shadow-[2px_2px_black] rounded-sm ${delteOption ? 'block' : 'hidden'}`}>
                                                                      <div className='font-semibold text-lg'>Are You Sure</div>
                                                                      <svg onClick={() => setDeleteOption(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 cursor-pointer rounded-sm active:bg-red-400 bg-red-600">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                      </svg>
                                                                      <button disabled={button} className={`${button ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                                           <svg onClick={() => deleteArticle(article._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 cursor-pointer rounded-sm active:bg-red-400 bg-green-600">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                           </svg>
                                                                      </button>
                                                                 </div>
                                                                 <svg onClick={() => delteOption ? setDeleteOption(false) : setDeleteOption(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="cursor-pointer size-6 ml-3 p-[3px] bg-[#7190e4] active:bg-[#5c7fe1] rounded-full">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                 </svg>
                                                            </div>
                                                       )}
                                                  </div>
                                             )}

                                             {article?.articlePhotos.length > 0 &&
                                                  (
                                                       <div className="w-full h-60 lg:h-96 relative mb-4">
                                                            <img src={article?.articlePhotos[imageIndex] || postImagErr} alt="" onError={(e) => e.target.src = postImagErr} className="w-full h-full bg-contain" />

                                                            {article?.articlePhotos.length > 1 && (
                                                                 <>
                                                                      <div onClick={() => imageIndex >= article?.articlePhotos.length - 1 ? setImageIndex(0) : setImageIndex(imageIndex + 1)} className="rounded-full backdrop-blur p-2 cursor-pointer active:opacity-75 absolute top-[40%] left-5">
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                                           </svg>
                                                                      </div>
                                                                      <div onClick={() => imageIndex === 0 ? setImageIndex(article?.articlePhotos.length - 1) : setImageIndex(imageIndex - 1)} className="rounded-full backdrop-blur p-2 cursor-pointer active:opacity-75 absolute top-[40%] right-5">
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                                           </svg>
                                                                      </div>
                                                                 </>
                                                            )}
                                                       </div>
                                                  )
                                             }

                                             {article?.paragraphs.map(
                                                  (paragraph, index) => (
                                                       <div key={index} className="mb-2">
                                                            <div className="font-bold text-3xl" id={`Introduction-${index}`}> {paragraph.title}</div>
                                                            <p className="textSelection wordSpace text-gray-600 font-normal font-signature1 text-lg">
                                                                 {paragraph.content}
                                                            </p>
                                                       </div>
                                                  )
                                             )}
                                        </section>
                                   </div>
                              </>
                         )}
                    </>
               )}
               {!isLoading && !error && article === null && (
                    <div className="mx-auto mt-5 lg:mt-20">
                         <img src="https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?resize=400x0" alt="" className="border-2 border-black mb-5 w-fit mx-auto" />
                         <div className="text-lg font-extralight text-slate-500 text-center -mt-28">No Stories Found</div>
                    </div>
               )}
          </div>
     );
};

export default BlogContent;
