import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';
import noProfilePicture from '../../Assets/NoProileImage.png';
import moment from 'moment';
import SendMessage from './SendMessage';

const MessgaeSection = ({ userPhoto }) => {
    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
    const sender_id = useSelector((state) => state.messageSlice.senderId);
    const reciver_id = useSelector((state) => state.messageSlice.receiverId);
    const reciver_photo = useSelector((state) => state.messageSlice.reciverPhoto);
    const [Messages, setMessages] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [consversation, setConsversation] = useState();
    const navigate = useNavigate();

    // function to get message at front end
    useEffect(() => {
        if (sender_id === "null" || reciver_id === "null") {
            navigate("/message");
        }
    }, [sender_id, reciver_id, navigate]);

    const getMessages = async () => {
        setIsLoading(true);
        try {
            const res = await API.post("/getMessage", { sender_id, reciver_id });
            if (res.status === 200) {
                    setMessages(res.data.conversationHistory);
                    setIsLoading(false);
            } else {
                setError(true);
                    setIsLoading(false);
            }
        } catch (error) {
            setError(true);
                setIsLoading(false);
        }
    };

    useEffect(() => {
        getMessages();
        // eslint-disable-next-line
    }, [reciver_id, sender_id]);

    const handleDownloadImage = (url, id) => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `Photo-${id}`;
        anchor.addEventListener('click', () => {
            toast.success("Photo is Downloaded Successfully");
        });
        anchor.click();
    };

    useEffect(() => {
        if (consversation?.result.success) {
            setMessages(prevMessages => [...prevMessages, consversation.result.createdMessage]);
        }
    }, [consversation]);

    return (
        <div className="lg:w-[80%] right-0 absolute mt-[10px] pb-36 lg:pb-36 lg:mt-10 pt-14 space-y-5 example w-full overflow-hidden">
            {isLoading && (<div className='text-3xl text-gray-500 font-thin pt-40 text-center'>Loading Older Chats</div>)}
            <ToastContainer />
            {error ? (
                <div className='text-lg text-gray-400 font-semibold w-full text-center'>Network Error</div>
            ) : (
                <div className="shadow- rounded-3xl text-sm font-medium space-y-6 p-3 h-4/5 overflow-y-scroll example">
                    {!isLoading && (!Messages || Messages.length === 0) ? (
                        <div className="text-center text-gray-500 mt-4">No Conversation Exists</div>
                    ) : (
                        <>
                            {Messages.map((msg, index) => (
                                <div id={index} key={index} className={`flex gap-3 ${msg.sourceId === sender_id ? 'flex-row-reverse items-end' : ''}`}>
                                    <img src={(msg.sourceId === sender_id ? userPhoto?.user?.profilePhoto : reciver_photo) || noProfilePicture}
                                        onError={(e) => e.target.src = noProfilePicture}
                                        alt="user"
                                        className={`${msg.sourceId === sender_id ? 'select-none w-9 h-9 rounded-full shadow object-contain -translate-y-4' : 'select-none w-9 h-9 rounded-full shadow object-contain'}`}
                                    />
                                    <div className="flex flex-col space-y-2">
                                        {msg.messagePhoto.length > 0 && (
                                            <div className='flex-col relative items-start w-fit h-full mx-auto space-y-3'>
                                                {msg.messagePhoto.map((_, index) => (
                                                    <figure key={index} className="relative overflow-hidden max-w-lg border rounded-xl border-gray-200">
                                                        <svg onClick={() => handleDownloadImage(msg.messagePhoto[index]?.base64, msg.messagePhoto[index]?.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 absolute rounded-md opacity-90 right-4 top-2 bg-[#6e8ee1] p-1 cursor-pointer">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                        <img className="h-auto w-80 sm:max-w-96 max-h-40 object-cover" src={msg.messagePhoto[index]?.base64 || postImagErr} onError={(e) => e.target.src = postImagErr} alt={`imgErr-${index}`}/>
                                                    </figure>
                                                ))}
                                            </div>
                                        )}

                                        {msg.message && (
                                            <div className={`relative px-4 py-2 rounded-[20px] max-w-2xl ${msg.sourceId === sender_id ? 'bg-[#708fe3] text-white shadow-[1px_2px_1px_gray]' : 'bg-gray-200'}`}>
                                                <div className='font-sans'>{msg.message}</div>
                                            </div>
                                        )}

                                        <div className='text-right font-extralight font-italic font-mono text-[10px] md:text-[12px] select-none'>
                                            {moment(msg?.createdAt).format('h:mm A, DD/MMM/YYYY')}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </>
                    )}
                </div>
            )}
            <SendMessage userPhoto={userPhoto} newConsversation={setConsversation} />
        </div>
    );
};

export default MessgaeSection;