import React, { useState } from "react";
import addPattern from "../../Assets/images/ad_pattern.png";
import { useSelector } from "react-redux";
import { useMutation, useIsMutating, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createPost, warning } from "./CommunityPostFunction";

const CretaeGroupPost = ({ setWarning, display }) => {

     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const queryClient = useQueryClient();
     const { groupId } = useParams();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     const [sizeWarning, setSizeWarning] = useState(false);
     const [fileUploaded, setFileUploaded] = useState([]);
     const [postMessage, setPostMessage] = useState("");
     const MAX_FILE_SIZE = 12 * 1024 * 1024;

     let handleImageChange = (e) => {
          const files = e.target.files;
          const filesArray = Array.from(files);
          let totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);

          if (totalSize > MAX_FILE_SIZE) {
               setSizeWarning(true);
               return;
          }

          const validTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/avif', 'image/png'];
          const invalidFiles = filesArray.filter(file => !validTypes.includes(file.type));

          if (invalidFiles.length > 0) {
               setSizeWarning(true);
               return;
          }

          filesArray.forEach((file) => {
               let reader = new FileReader();
               reader.onloadend = () => {
                    let base64String = reader.result;
                    setFileUploaded((prevFiles) => [...prevFiles, base64String]);
               };
               reader.readAsDataURL(file);
          });
     };

     const handleRemoveImages = () => {
          setFileUploaded([]);
     };

     const { mutate: handleCreatePost } = useMutation({
          mutationKey: (['createPost', userId]),
          mutationFn: ({ groupId, userId, post, fileUploaded, postMessage }) => createPost({ groupId, userId, post, fileUploaded, postMessage }),
          onSuccess: (data) => {

               if (data.success === 200) {
                    
                    setFileUploaded([]);
                    setPostMessage("");
                    queryClient.invalidateQueries(['fetchGroupPost']);
               }
          },
          onError: (data) => {
               if (data.status !== 200) {
                    warning(setWarning, true, 5000)
               }
          }
     })

     const isPosting = useIsMutating(['createPost', userId])

     return (
          <div className={`${display === 1 ? 'translate-x-0' : 'translate-x-full'} duration-500 w-3/4 relative mb-5 overflow-hidden mx-auto p-7 pt-0 rounded-lg`}>
               <div className="space-y-5 pt-10">
                    <div>
                         <textarea value={postMessage} onChange={(e) => setPostMessage(e.target.value)} placeholder='Post Message...' type="text" className="resize-none w-full h-[32px] border-[#42579d] border-2 focus:h-24 transition-all duration-500 mt-3 focus:border focus:border-gray-300 focus:pt-1 outline-none rounded-md py-.5 pl-2 text-gray-500" />
                    </div>
                    <div style={{ backgroundImage: `url(${addPattern})` }} className='border-2 shadow-xl rounded-md'>
                         <div className="w-full h-72 relative border1 rounded-md overflow-hidden bg-repeat">
                              <label htmlFor="createStatusUrl" className="w-fit h-fit flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 pb-6 pt-10 cursor-pointer bg-gradient-to-t">
                                   {fileUploaded.length === 0 ? <input onChange={(e) => handleImageChange(e)} id="createStatusUrl" accept="image/*" type="file" className="hidden" /> : null}
                                   {sizeWarning && <div className="text-red-600 text-xs italic w-full text-center">Max size exceede, permisible size 12Mb </div> }
                                   {fileUploaded.length === 0 ? <><ion-icon name="postImage" className="text-3xl text-teal-600 md hydrated" role="postImg"></ion-icon><span className="text-black mt-2 text-center bg-white">Browse to Upload image </span></> : <span onClick={() => handleRemoveImages()} className="text-gray-800 mt-2 w-fit h-fit">Re-upload</span>}
                              </label>
                              <div className='flex w-full overflow-x-scroll h-full example'>
                                   {fileUploaded?.length > 0 && (
                                        <div className='h-full w-full relative'>
                                             <img onError={(e) => e.target.src = postImagErr} src={fileUploaded[0] || postImagErr} alt="UploadedImage" className="w-full mx-1 h-full object-contain" />
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
                    <div className="flex justify-between items-center">
                         <button disabled={isPosting} onClick={() => handleCreatePost({ groupId, userId, post: 'post', fileUploaded, postMessage })} type="button" className={`button mx-auto bg-[#3954aa] hover:bg-[#072daa] text-white px-8 rounded-md text-xl py-1 ${isPosting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>{isPosting ? 'Creating...' : 'Create'}</button>
                    </div>
               </div>
          </div>
     );
};

export default CretaeGroupPost;
