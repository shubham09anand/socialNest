import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const AiImage = ({ setFileUploaded , setDisplay }) => {

     const [aiImgSec, setAiImgSec] = useState(false);
     const [aiResponse, setAiResponse] = useState();
     const [prompt, setprompt] = useState();
     const [Status, setStatus] = useState("Your Image Will Be displayed Here");
     const [buttonStatus, setButtonStatus] = useState(false);
     const [regenrate, setRegenrate] = useState(true);


     const getImage = () => {
          if (setprompt !== null) {
               setButtonStatus(true);
               API.post("/textToImage", { prompt: prompt })
                    .then((res) => {
                         setRegenrate(false);
                         setButtonStatus(false);
                         setAiResponse(res.data);
                         setAiImgSec(true);
                         setStatus("Getting Your Image");
                    })
                    .catch((error) => {
                         console.log(error);
                    }).finally(() => {
                         setButtonStatus(false)
                    });
          } else {
               toast.warning("Enter Your Prompt")
          }
     };

     const handleAiImageProcess = () =>{
          setFileUploaded(aiResponse?.imageUrls[0]);
          setDisplay(false)
     }

     return (
          <div className='flex place-content-center items-center w-full'>
               <ToastContainer />
               <div className='flex justify-between w-full'>
                    {regenrate ? (
                         <>
                              <div className='w-full place-content-center items-center flex'>
                                   <div className="flex space-x-3 w-full bg-white py-2 px-3">
                                        <label htmlFor="username" className="font-medium leading-6 text-gray-900 text-xl hidden">Your Prompt</label>
                                        <textarea onChange={(e) => { setprompt(e.target.value) }} value={prompt} type="text" name="username" id="username" className="bg-white resize-none outline-none w-full border-2 rounded-lg border-black bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-700 sm:text-sm sm:leading-6" placeholder="Enter your text to convert in image (be descriptive as much as possible )" />
                                        <button disabled={buttonStatus} onClick={getImage} className={`px-4 bg-black text-white text-md rounded-md active:opacity-70 ${buttonStatus ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                             </svg>
                                        </button>
                                   </div>
                              </div>
                         </>
                    ) : (
                         <>
                              {aiImgSec && aiResponse ? (
                                   <div className='px-5 mx-auto mb-2 space-y-2 w-full bg-white'>
                                        <img className='w-80 h-52 mt-5 rounded-xl mx-auto '
                                             src={aiResponse.imageUrls[0]}
                                             alt="AI Image"
                                        />
                                        <div className='flex gap-x-5 w-fit mx-auto'>
                                             <div onClick={() => setRegenrate(true)} className='bg-black mx-auto cursor-pointer text-xs rounded-md px-2 py-1 w-fit h-fit text-white'>Regenrate</div>
                                             <div onClick={handleAiImageProcess} className='bg-green-500 mx-auto cursor-pointer text-xs rounded-md px-2 py-1 w-fit h-fit text-white'>Send</div>
                                        </div>
                                   </div>
                              ) : (
                                   <div className={`w-1/2 mx-auto h-[200px] mt-5 rounded-xl object-fill border-2 border-black bg-gray-100 text-center animate-pulse`}>{Status}</div>
                              )}
                         </>
                    )}
               </div>
          </div>
     );
};

export default AiImage;