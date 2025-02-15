import React, { useEffect, useState } from 'react';
import AIchat from '../Messages/AIchat';
import GroupScheduledMessage from './GroupScheduledMessage';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const SendGroupMessage = ({ userDetails, expand, setTotalMessage }) => {

     const { groupId } = useParams();
     const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
     const senderId = useSelector((state) => state.LoginSlice.loggedUserId);
     const [image, setImage] = useState([]);
     const [message, setMessage] = useState("");
     const [aiSection, setAiSection] = useState(false);
     const [socket, setSocket] = useState(null);

     const handleImageUpload = (e) => {
          const files = Array.from(e.target.files);
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          const maxTotalSize = 12 * 1024 * 1024; // 12MB
          let totalSize = files.reduce((acc, file) => acc + file.size, 0);

          if (totalSize > maxTotalSize) {
               return toast.warning('Max Size Allowed 12Mb.');
          }

          const validFiles = files.filter((file) => allowedTypes.includes(file.type));
          if (validFiles.length !== files.length) {
               return toast.warning('Only Jpeg, Jpg, Png');
          }

          validFiles.forEach((file) => {
               const reader = new FileReader();
               reader.onloadend = () => setImage((prev) =>
                    [...prev, { base64: reader.result, type: file.type, name: file.name }]
               );
               reader.readAsDataURL(file);
          });
     };

     const resetImageUpload = () => {
          setImage([]);
     }

     useEffect(() => {
          // const s = io('http://192.168.1.6:8080');
          const s = io('http://127.0.0.1:8080/socket_2');
          setSocket(s);

          if (groupId && s) {
               s.emit("join_group_room", groupId);
          }

          return () => {
               s.disconnect();
          };
     }, [groupId, setTotalMessage]);

     useEffect(() => {
          if (!socket) return;

          socket.on("forward_group_message", (data) => {
               if (data?.result?.success) {
                    const senderMessage = {
                         _id: senderId,
                         firstName: data?.content.firstName,
                         lastName: data?.content.lastName,
                         userName: data?.content.userName,
                    };

                    const newMessage = {
                         ...data.result.newGroupMessage,
                         senderMessage: senderMessage, // Adding senderMessage as a property
                    };

                    setTotalMessage((prev) => [...prev, newMessage]);
               }

          });

          return () => {
               socket.off("forward_group_message");
          };
          // eslint-disable-next-line 
     }, [socket]);


     useEffect(() => {
          if (!socket) return;

          const handleGroupMessage = (messageData) => {
               return true
          };

          socket.on("send_group_message", handleGroupMessage);

          return () => {
               socket.off("send_group_message", handleGroupMessage);
          };
     }, [socket, setTotalMessage]);

     const handleSendMessage = () => {
          if (!message.trim() && image.length === 0) {
               return alert("Cannot send an empty message.");
          }

          const data = { groupId, senderId, userName: userDetails[0]?.userName, firstName: userDetails[0]?.firstName, lastName: userDetails[0]?.lastName, message, messagePhoto: image, createdAt: new Date(), };

          if (socket) {
               socket.emit("send_group_message", data);
               setMessage("");
               resetImageUpload();
          }
     };

     return (
          <div className={`${expand ? 'w-full lg:w-4/5' : 'w-full md:w-1/2 lg:w-2/5'} bg-white border-t h-fit items-center fixed z-20 bottom-11 lg:bottom-0 example`}>
               <div className="w-full items-center gap-1">

                    {aiSection && <AIchat />}

                    <GroupScheduledMessage />

                    <div className="mb-2 sm:mb-0">
                         {image.length !== 0 && (
                              <div className="relative h-fit flex-col items-center justify-center w-full">
                                   {image.length !== 0 && (
                                        <>
                                             <div className='flex w-fit overflow-x-scroll h-full mx-auto my-2 space-x-3'>
                                                  {image.map((pic, index) => (pic.base64.startsWith("data:image/") &&
                                                       <img key={index} className='w-60 h-40 rounded-lg object-contain' src={pic.base64 || postImagErr} onError={(e) => e.target.src = postImagErr} alt="ImageError" />
                                                  ))}
                                             </div>
                                             <div onClick={() => resetImageUpload()} className='cursor-pointer mx-auto text-sm font-bold rounded-md bg-[#4163c2] text-white w-fit h-fit mt-2 p-1 mb-3'>Reupload</div>
                                        </>
                                   )}
                              </div>
                         )}

                         <div className='relative px-1 flex place-content-center items-center gap-1 sm:gap-2 sm:px-1 md:pt-1'>

                              {!aiSection && (
                                   <textarea onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder="Type Message....." className="block h-8 max-h-12 md:h-12 pt-1.5 px-4 hover:outline-[#708fe3] focus:outline-[#708fe3] focus:bg-gray-50 w-full example pl-2 bg-gray-200 rounded-full resize-none placeholder:pl-1 placeholder:font-extrabold placeholder:pt-1 placeholder:text-sm focus:text-gray-700" />
                              )}

                              <div onClick={() => aiSection ? setAiSection(false) : setAiSection(true)} className={`rounded-full cursor-pointer bg-[#4463ba] ${aiSection ? 'absolute right-4 -top-12' : ''}`}>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={`${aiSection ? 'w-8 h-8 p-2 md:w-11 md:h-11 ' : 'w-7 h-7 p-2 md:w-10 md:h-10 '}`}>
                                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                                   </svg>
                              </div>

                              {!aiSection && (
                                   <label title='Send Photo' className="inline-flex translate-y-1 items-center justify-center bg-[#4263bc] transition rounded-full duration-500 ease-in-out text-black cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-7 h-7 p-2 md:w-10 md:h-10">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                        </svg>
                                        <input onChange={(e) => handleImageUpload(e)} multiple id="file" type="file" accept=".jpg, .jpeg, .gif, .webp, .avif" className="hidden" />
                                   </label>
                              )}

                              {!aiSection &&
                                   <button onClick={() => handleSendMessage(groupId, message, senderId, image)} title='Send Message' className='cursor-pointer outline-none bg-[#2c4ba0] rounded-full' type="submit">
                                        <svg className={`text-gray-800 outline-none active:opacity-70 origin-center transform rotate-90 ${!true ? 'p-2 w-10 h-10' : 'w-7 h-7 p-2 md:w-10 md:h-10'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                                             <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                   </button>
                              }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default React.memo(SendGroupMessage);