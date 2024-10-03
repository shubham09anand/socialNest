import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import API from '../../Services/API';

const ScheduledMessage = ({ toggleprofileDisplay }) => {

    const source_id = useSelector((state) => state.messageSlice.senderId);
    const receiver_id = useSelector((state) => state.messageSlice.receiverId);
    const [open, setOpen] = useState(null);
    const [scheduledMessage, setScheduledMessage] = useState();
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [button, setButton] = useState(false);
    const [timeWarning, setTimeWarning] = useState(false);
    const [currentDateandTime, setCurrentDateandTime] = useState(new Date());
    const [cancelButton, setCancelButton] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateandTime(new Date().toISOString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleMessageChange = useCallback((e) => {
        setMessage(e.target.value);
    }, []);
    const handleTimeChange = useCallback((e) => {
        setTime(e.target.value);
    }, []);
    const handleDateChange = useCallback((e) => {
        setDate(e.target.value);
    }, []);

    const sendScheduledMessage = () => {
        if (!message || !date || !time) {
            toast.info("Please fill in all fields");
            return;
        }

        const combinedDateTimeString = `${date}T${time}`;
        const dateTimeObject = new Date(combinedDateTimeString);
        const dateTimeISOString = dateTimeObject.toISOString();

        if (new Date(currentDateandTime) < new Date(dateTimeISOString)) {
            setButton(true);
            setTimeWarning(false);
            API.post("/createScheduledMessage", {
                senderId: source_id,
                receiverId: receiver_id,
                scheduledMessage: message,
                scheduledDateTime: dateTimeISOString
            })
                .then(() => {
                    toast("Message is being Scheduled");
                    setDate("");
                    setTime("");
                    setMessage("");
                    toggleprofileDisplay(0);
                })
                .catch((error) => {
                    toast("Something Went Wrong");
                    console.error('Error fetching messages:', error);
                })
                .finally(() => {
                    setButton(false);
                });
        } else {
            setTimeWarning(true);
        }
    };

    //get all scheduled message
    const getScheduledMessage = async () => {
        try {
            API.post("/getScheduledMessage", { userId: source_id, receiver_id: receiver_id }).then((res) => {
                if (res.status === 200) {
                    setScheduledMessage(res.data);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Delete message
    const deleteScheduledMessage = (id) => {    
        if (!id) {
            toast.info("Message ID is required");
            return;
        }
    
        setCancelButton(true);
    
        API.post("/deleteScheduledMessage", { messageId: id })
            .then((req, _) => {
                if (req.data.status === 1) {
                    setScheduledMessage((prevState) => ({
                        ...prevState,
                        messages: prevState.messages?.filter((message) => message._id !== id)
                    }));
                    toast.success("Scheduled Message Deleted");
                } else if (req.data.status === 0) {
                    toast.info("Message was not found or already sent");
                }
            })
            .catch((error) => {
                toast("Something Went Wrong");
            })
            .finally(() => {
                setCancelButton(false);
            });
    };
     

    useEffect(() => {
        getScheduledMessage();
        // eslint-disable-next-line
    }, [source_id]);

    return (
        <div className='overflow-y-scroll border-t-4 border-black h-[300%] sm:w-1/2 lg:w-2/4 xl:w-[27%] mt-[60px] border-l bg-white fixed z-[770] right-0 top-0 px-4'>
            <ToastContainer />

            <div className='overflow-y-scroll h-[200%]'>
                <div className='z-50 flex w-full justify-between place-content-center items-center h-fit'>
                    <h2 className="text-2xl w-fit mx-auto pb-2 sm:leading-snug tracking-wide font-bold pt-3">Schedule Message</h2>
                    <svg onClick={() => toggleprofileDisplay(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="5" stroke="white" className="fixed right-5 translate-y-1 w-6 h-6 bg-[#6f88c9] rounded-full p-1 active:opacity-80">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className='bg-gradient-to-r to-blue-500 via-blue-600 from-blue-900 w-fit relative cursor-help mx-auto rounded-full p-2 scale-90' title='scheduled messages'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock-history w-5 h-5 absolute bottom-2 right-2 border-2 z-20 bg-white rounded-full" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </div>

                <section className="bg-white border-b">
                    <div className="py-2 mx-auto max-w-screen-xl text-center">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl">What Is Scheduled Messeging ?</h1>
                        <p className="text-sm tracking-wider font-light text-gray-600">Scheduled Messaging allows you to create a message that will be sent automatically at a future date and time of your choice. Simply set the desired time and write your message. When the scheduled time arrives, your message will be delivered. Sit back, relax, and let the scheduling take care of it.</p>
                    </div>
                </section>

                <div style={{ outline: "none" }} className="  outline-none overflow-y-scroll ">
                    <div style={{ outline: "none" }} className={` text-base py-2 border-b-2 border-black`}>
                        Set A Scheduled Message
                    </div>
                    <div className="pt-0 text-xs font-normal py-0 px-2">
                        <div className="w-full space-y-2 py-2 ">
                            <div>
                                <label htmlFor="Message" className="block mb-2 text-sm text-gray-900 font-semibold">Message <span className='text-red-600'>*</span></label>
                                <input onChange={handleMessageChange} value={message} type="Message" id="Message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Enter Your Message" required />
                            </div>
                            <div className='flex justify-between w-full space-x-4'>
                                <div className='w-full'>
                                    <label htmlFor="Time" className="block mb-2 text-sm text-gray-900 font-semibold">Time <span className='text-red-600'>*</span></label>
                                    <input onChange={handleTimeChange} value={time} type="time" id="Time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="Date" className="block mb-2 text-sm text-gray-900 font-semibold">Date <span className='text-red-600'>*</span></label>
                                    <input onChange={handleDateChange} value={date} type="date" id="Time" className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 " required />
                                </div>
                            </div>
                            {timeWarning && <div className='text-red-600 italic tetx-xs'>Set A Valid Furtue Time</div>}
                            < button disabled={button} onClick={sendScheduledMessage} className={`text-white bg-[#4b5e9b] active:bg-[#2e489b] focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center font-semibold ${button ? "cursor-not-allowed" : "cursor-pointer"}`}>Set Message</button>
                        </div>
                    </div>
                </div>

                <h2 className="py-2 sm:leading-snug tracking-wide mt-4 font-semibold border-b-2 border-black mb-2 select-none">Previous Scheduled Message</h2>
                {scheduledMessage?.messages.length > 0 ?
                    (<div className='space-y-2'>
                        {scheduledMessage?.messages.map((message, index) => (

                            <div key={index} className='w-full overflow-hidden border-b'>
                                <div className='w-full flex space-x-5'>
                                    <div onClick={() => setOpen(index)} className='bg-[#556eaf] rounded-full p-1 h-fit w-fit translate-y-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="size-4 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>

                                    <div className="block font-sans text-lg font-thin">Will Be Deliver At {moment(message?.scheduledDateTime).format('h:mm A, DD-MM-YYYY')}</div>
                                </div>
                                <div className={`flex mt-2 ${open === index ? 'h-fit' : 'h-0'}`}>
                                    <div className='-ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#556eaf" className="size-6 mt-1.5 ml-2 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </div>
                                    <div className="block font-sans text-lg font-thin"> {message.scheduledMessage}</div>
                                </div>

                                {index === open && (<div className='w-fit h-fit mx-auto my-2'><button disabled={cancelButton} onClick={() => deleteScheduledMessage(message._id)} className={`px-4 py-1 w-fit h-fit mx-auto text-center mt-2 text-white font-semibold rounded-sm bg-[#2a448a] hover:bg-[#436fe8] ${cancelButton ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>Cancel</button></div>)}

                                {index === open && (<div onClick={() => setOpen(null)} className='text-sm pb-2 font-semibold cursor-pointer text-blue-700 pt-2 pl-9'>show less</div>)}
                            </div>
                        ))}
                    </div>)
                    :
                    <>No Message Exists</>}
            </div>
        </div>
    )
}
export default React.memo(ScheduledMessage);