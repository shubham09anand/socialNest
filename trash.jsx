import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import API, { socketUrl } from '../../Services/API';
import noProfilePicture from '../../Assets/NoProileImage.png';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { handleDownloadImage } from './MessageFunction';
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const NewConversation = ({ boxRef, conversation, isFetchingNextPage, userPhoto, setNewConversation }) => {

	const newMess = useRef();
	const { roomID } = useParams();
	const queryClient = useQueryClient();
	const [socket, setSocket] = useState(null);
	const [position, setPosition] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState(false);
	const [delteMessage, setDelteMessage] = useState(null);
	const reciver_photo = useSelector((state) => state.messageSlice.reciverPhoto);
	const reciver_id = useSelector((state) => state.messageSlice.receiverId);
	const sender_id = useSelector((state) => state.messageSlice.senderId);
	const [seenMessage, setSeenMessage] = useState([]);
	const [newMessageCache, setNewMessageCache] = useState([]);
	const [seenCount, setSeenCount] = useState(0)
	const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';

	const handleDeleteMessage = async (messageID) => {
		setDeleteStatus(true);
		try {
			const res = await API.post("/deleteMessage", { messageID });

			if (res.status === 200 && res.data.deleteCount === 1) {
				setDelteMessage(null);
				setNewConversation((prev) => prev.filter(mess => mess?._id !== messageID));

			} else if (res.status === 200 && res.data.deleteCount === 0) {
				alert("Something went wrong");
			}
		} catch (error) {
			alert("Something went wrong");
		} finally {
			setDeleteStatus(false);
		}
	};

	const calculatePosition = () => {
		if (boxRef.current && newMess.current) {
			const parentRect = boxRef.current.getBoundingClientRect();
			const childRect = newMess.current.getBoundingClientRect();
			const newPosition = childRect.top - parentRect.top;
			setPosition(newPosition);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			calculatePosition();
		};

		const parentBox = boxRef.current;
		if (parentBox) {
			parentBox.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (parentBox) {
				parentBox.removeEventListener("scroll", handleScroll);
			}
		};
	}, [boxRef]);

	useEffect(() => {
		calculatePosition();
	}, [isFetchingNextPage]);

	// useEffect(() => {
	// 	const handleScroll = () => calculatePosition();
	// 	const parentBox = boxRef.current;
	// 	if (parentBox) {
	// 		parentBox.addEventListener("scroll", handleScroll);
	// 	}
	// 	return () => {
	// 		if (parentBox) {
	// 			parentBox.removeEventListener("scroll", handleScroll);
	// 		}
	// 	};
	// }, [boxRef]);


	useEffect(() => {
		const s = io(`${socketUrl}/socket_1`);

		setSocket(s);

		s.emit("join_room", roomID);

		s.on("connect", () => { return 0 });

		return () => {
			s.disconnect();
			;
		};
	}, [roomID]);

	useEffect(() => {
		if (!socket) return;

		socket.emit("message_seen_update", { convoId: roomID, sourceId: reciver_id, reciverId: sender_id });

	}, [socket, roomID, reciver_id, sender_id, conversation]);

	useEffect(() => {
		if (!socket) return;

		socket.on("message_seen_update_ack", (data) => {
			console.log(data?.result?.updatedMessageId)
			if (data?.result?.success) {
				setSeenCount(seenCount + 1)
			}
			setSeenMessage((prev) => [...prev, data?.result?.updatedMessageId]);
		});

		return () => {
			socket.off("message_seen_update_ack");
		};
	}, [socket]);

	useEffect(() => {
		if (conversation?.result?.success && conversation?.result?.createdMessage) {
			queryClient.setQueryData(["newMessage", roomID], (oldMessages) => {
				const messages = oldMessages || [];
				return [...messages, conversation.result.createdMessage];
			});
		}
	}, [conversation, roomID, queryClient]);

	useEffect(() => {
		setNewMessageCache(queryClient.getQueryData(["newMessage", roomID]))
	}, [conversation])

	console.log(seenCount)

	return (
		<>
			{newMessageCache?.length > 0 && (
				<>
					{newMessageCache?.map((newMessage, index) => (
						<div ref={newMess} key={index} className={`flex gap-3 ${newMessage?.sourceId === sender_id ? 'flex-row-reverse items-end' : ''}`}>
							{(newMessage?.message || newMessage?.messagePhoto) && (
								<img src={(newMessage?.sourceId === sender_id ? userPhoto : reciver_photo) || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="user" className={`${newMessage?.sourceId === sender_id ? 'select-none w-9 h-9 rounded-full shadow object-contain -translate-y-4' : 'select-none w-9 h-9 rounded-full shadow object-contain'}`} />
							)}
							<div className="flex flex-col space-y-2">

								{delteMessage === index && (
									<button disabled={deleteStatus} onClick={() => handleDeleteMessage(newMessage?._id, index)} className='w-full flex flex-row-reverse'>
										<div className={`flex text-center bg-gray-200 cursor-pointer select-none border-[0.1px] border-gray-900 text-gray-800 px-2 py-1 rounded-lg ${deleteStatus ? 'opacity-90 animate-pulse cursor-wait' : ''}`}>{deleteStatus ? 'Deleting' : 'Delete'}</div>
									</button>
								)}

								{newMessage?.message && (
									<div className={`relative px-4 py-2 rounded-[15px] max-w-2xl ${newMessage?.sourceId === sender_id ? 'bg-[#708fe3] text-white shadow-[1px_2px_1px_gray]' : 'bg-gray-200'}`}>
										<div className='font-sans pr-3'>{newMessage?.message}</div>
										{newMessage?.sourceId === sender_id && (
											<>
												<svg onClick={() => delteMessage === null ? setDelteMessage(index) : delteMessage === index ? setDelteMessage(null) : setDelteMessage(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 absolute right-2 top-2 cursor-pointer active:opacity-50">
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
												</svg>
											</>
										)}
										{newMessage?.sourceId === sender_id && (
											<svg xmlns="http://www.w3.org/2000/svg" fill={`${(newMessage?.seen === 1 || seenMessage.includes(newMessage?._id)) ? 'blue' : ''}`} className="bi bi-check2-all h-4 w-4 absolute right-4" viewBox="0 0 16 16">
												<path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
												<path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
											</svg>
										)}
										<div className="text-red-500 text-xs italic">{position > 0 ? 'Below' : 'Above'}</div>
									</div>
								)}

								{newMessage?.messagePhoto?.length > 0 && (
									<div className='flex-col relative items-start w-fit h-full mx-auto space-y-3'>
										{newMessage?.messagePhoto?.map((_, photoIndex) => (
											<div key={photoIndex} className="relative overflow-hidden max-w-lg border rounded-xl border-gray-200">
												{newMessage?.sourceId === sender_id && (
													<button disabled={deleteStatus} className={`right-12 top-2 absolute w-fit h-fit ${deleteStatus ? 'opacity-5 animate-pulse cursor-wait' : ''}`}>
														<svg onClick={() => handleDeleteMessage(newMessage?._id, index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 rounded-md opacity-90 bg-[#6e8ee1] p-1 cursor-pointer">
															<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
														</svg>
													</button>
												)}
												<svg onClick={() => handleDownloadImage(newMessage?.messagePhoto[photoIndex]?.base64, newMessage?.messagePhoto[photoIndex]?.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 absolute rounded-md opacity-90 right-2 top-2 bg-[#6e8ee1] p-1 cursor-pointer">
													<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
												</svg>
												<img className="h-auto w-80 sm:max-w-96 max-h-40 object-cover" src={newMessage?.messagePhoto[photoIndex]?.base64 || postImagErr} onError={(e) => e.target.src = postImagErr} alt={`imgErr-${photoIndex}`} />
												{newMessage?.sourceId === sender_id && (
													<div className='backdrop-blur-[2px] absolute right-2 bottom-1 rounded-full h-fit w-fit'>
														<svg xmlns="http://www.w3.org/2000/svg" fill={`${(newMessage?.seen === 1 || seenMessage.includes(newMessage?._id)) ? 'blue' : ''}`} className="bi bi-check2-all h-5 w-5" viewBox="0 0 16 16">
															<path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
															<path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
														</svg>
													</div>
												)}
											</div>
										))}
									</div>
								)}
								{(newMessage?.message || newMessage?.messagePhoto) && (
									<div className='text-right font-extralight font-italic font-mono text-[10px] md:text-[12px] select-none'>
										{moment(newMessage?.createdAt).format('h:mm A, DD/MMM/YYYY')}
									</div>

								)}
							</div>
						</div>
					))}
				</>
			)}

		</>
	)
}

export default NewConversation