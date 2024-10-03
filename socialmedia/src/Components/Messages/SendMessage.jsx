import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import AIchat from './AIchat';

const SendMessage = ({ newConsversation }) => {

  const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
  const sourceId = useSelector((state) => state.messageSlice.senderId);
  const reciverId = useSelector((state) => state.messageSlice.receiverId);
  const { roomID } = useParams();
  const [message, setMessage] = useState('');
  const [photoSection, setphotoSection] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [display, setDisplay] = useState(false);
  const [aiSelctionDislay, setAiSelctionDislay] = useState(true);
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const s = io('http://13.202.210.238/:8080');
    setSocket(s);

    // Join the room when the component mounts
    if (roomID && s) {
      s.emit("join_room", roomID);
    }

    return () => {
      s.disconnect();
    };
  }, [roomID]);

  // Handle real-time receiving of messages
  useEffect(() => {
    if (!socket) return;

    socket.on("forward_message", (data) => {
      newConsversation(data);  // Update the conversation with the new message
    });

    return () => {
      socket.off("forward_message");
    };
  }, [socket, newConsversation]);

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = [].slice.call(files);

    let totalSize = 0;
    filesArray.forEach((file) => (totalSize += file.size));

    if (totalSize > (12 * 1024 * 1024)) {
      toast.error("File Size Exceeded 12 MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/gif", "image/webp", "image/avif"];

    const validFiles = filesArray.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length !== filesArray.length) {
      toast.error("Only JPEG, JPG, and GIF files are allowed");
      return;
    }

    // Process each valid file
    validFiles.forEach((file) => {
      const reader = new FileReader();
      const fileType = file.type || "notKnown";
      reader.onloadend = () => {
        const base64String = reader.result;
        setFileUploaded((prevFiles) => [
          ...prevFiles,
          { base64: base64String, type: fileType, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove images from the state
  const handleRemoveImages = () => {
    setphotoSection(false);
    setFileUploaded([]);
  };

  // Process message sending
  const sendMessage = (e) => {
    e.preventDefault();

    if (!(message || fileUploaded.length > 0)) {
      toast.warning("Either message or photo is required");
      return;
    };

    if (!socket || !roomID) return;

    const messageData = { sourceId, reciverId, message, messagePhoto: fileUploaded, convoId: roomID };

    socket.emit("send_message", messageData);
    handleRemoveImages();
    setMessage("");
  };

  return (
    <div className="lg:w-[80%] border-t backdrop-blur-xl right-0 z-10 pb-12 lg:pb-0 fixed items-center overflow-x-hidden bottom-0 w-full example">
      <ToastContainer style={{ fontSize: '15px', marginTop: "100px" }} />
      {display && aiSelctionDislay && <AIchat />}
      <form onSubmit={sendMessage} className="w-full pt-1 items-center gap-1">
        <div className="mb-2 sm:mb-0">
          {photoSection && (
            <div className="relative h-fit flex-col items-center justify-center w-full">
              {fileUploaded.length !== 0 && (
                <>
                  <div className='flex w-fit overflow-x-scroll h-full mx-auto my-2 space-x-3'>
                    {fileUploaded.map((pic, index) => (pic.base64.startsWith("data:image/") &&
                      <img key={index} className='w-60 h-40 rounded-lg object-contain' src={pic.base64 || postImagErr} onError={(e) => e.target.src = postImagErr} alt="ImageError" />
                    ))}
                  </div>
                  <div onClick={handleRemoveImages} className='cursor-pointer mx-auto text-xs font-semibold bg-[#708fe3] text-white w-fit h-fit mt-2 rounded-md p-1 mb-3'>Cancel</div>
                </>
              )}
            </div>
          )}

          <div className='relative px-1 flex place-content-center items-center gap-1 sm:gap-2 sm:px-1'>
            <textarea onFocus={() => setAiSelctionDislay(false)} onBlur={() => setAiSelctionDislay(true)} onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder="Type message" className="block h-10 max-h-14 md:h-14 pt-1.5 px-4 overflow-hidden hover:outline-[#708fe3] focus:outline-[#708fe3] focus:bg-gray-50 w-full example pl-2 bg-gray-200 rounded-full resize-none placeholder:pl-1 placeholder:pt-1 placeholder:text-sm focus:text-gray-700" />

            {aiSelctionDislay && (
              <div onClick={() => display ? setDisplay(false) : setDisplay(true)} className='rounded-full cursor-pointer bg-[#708fe3] '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 p-2 md:w-10 md:h-10">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {aiSelctionDislay && (
              <label title='Send Photo' onClick={() => setphotoSection(true)} className="inline-flex translate-y-1 items-center justify-center bg-[#708fe3] transition rounded-full duration-500 ease-in-out text-black cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-7 h-7 p-2 md:w-10 md:h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
                <input onChange={handleImageChange} multiple id="file" type="file" accept=".jpg, .jpeg, .gif, .webp, .avif" className="hidden" />
                </label>
            )}

            <button title='Send Message' className='cursor-pointer outline-none bg-[#708fe3] rounded-full' type="submit">
              <svg className={`text-gray-800 outline-none active:opacity-70 origin-center transform rotate-90 ${!aiSelctionDislay ? 'p-2 w-10 h-10' : 'w-7 h-7 p-2 md:w-10 md:h-10'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SendMessage);