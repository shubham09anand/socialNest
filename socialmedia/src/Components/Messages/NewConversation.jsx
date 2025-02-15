import React, { useEffect, useRef, useState } from "react";
import API, { socketUrl } from "../../Services/API";
import { useQueryClient } from "@tanstack/react-query";
import { handleDownloadImage } from "./MessageFunction";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import moment from "moment";

const MessageContent = ({ boxRef, isFetchingNextPage, msg, index }) => {

	const messageBox = useRef();
	const { roomID } = useParams();
	const postImagErr = "https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png";
	const sender_id = useSelector((state) => state.messageSlice.senderId);
	const reciver_id = useSelector((state) => state.messageSlice.receiverId);
	const queryClient = useQueryClient();
	const [socket, setSocket] = useState(null);
	const [position, setPosition] = useState(0);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const [deleteStatus, setDeleteStatus] = useState(false);
	const [seenMessage, setSeenMessage] = useState([]);

	const handleDeleteMessage = async (messageID) => {
		setDeleteStatus(true);
		try {
			const res = await API.post("/deleteMessage", { messageID });
			if (res.status === 200 && res.data?.deleteCount === 1) {
				queryClient.setQueryData(["getMessage", sender_id, reciver_id], (oldData) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							conversationHistory: page.conversationHistory.filter(msg => msg._id !== messageID)
						}))
					};
				});

				setDeleteMessage(null);
			} else {
				alert("Message not found or already deleted.");
			}
		} catch (error) {
			alert("Something went wrong while deleting the message.");
		} finally {
			setDeleteStatus(false);
		}
	};


	const calculatePosition = () => {
		if (boxRef.current && messageBox.current) {
			const parentRect = boxRef.current.getBoundingClientRect();
			const childRect = messageBox.current.getBoundingClientRect();
			setPosition(((childRect.top + messageBox.current.clientHeight - (messageBox.current.clientHeight / 2.8)) - parentRect.top));
		}
	};

	useEffect(() => calculatePosition(), [isFetchingNextPage]);

	useEffect(() => {
		const handleScroll = () => calculatePosition();
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
		const s = io(`${socketUrl}/socket_1`);
		setSocket(s);

		s.emit("join_room", roomID);

		s.on("connect", () => { return 0 });

		return () => {
			s.disconnect();
		};
	}, [roomID]);

	useEffect(() => {
		if (!socket || !msg) return;

		// Check if the message is unseen
		const isMessageUnread = msg?.seen === 0;
		const isReceiver = msg?.reciverId === sender_id;

		// Emit message seen update for both sender & receiver
		if (position > 0 && isMessageUnread && isReceiver) {
			socket.emit("message_seen_update", { convoId: roomID, messageId: msg?._id });
		}

	}, [socket, roomID, position, msg]);

	useEffect(() => {
		if (!socket) return;
	 
		socket.on("message_seen_update_ack", (data) => {
		    setSeenMessage((prev) => [...prev, data?.result?.updatedMessageId]);
		});
	 
		return () => {
		    socket.off("message_seen_update_ack");
		};
	 }, [socket]);
	 

	useEffect(() => {
		console.log("Updated seen messages:", seenMessage);
	}, [seenMessage]);

	return (
		<div>
			{deleteMessage === index && (
				<button disabled={deleteStatus} onClick={() => handleDeleteMessage(msg?._id, index)} className='mb-2 w-full flex flex-row-reverse'>
					<div className="flex text-center bg-gray-200 cursor-pointer select-none border-[0.1px] border-gray-900 text-gray-800 px-2 py-1 rounded-lg">
						{deleteStatus ? 'Deleting' : 'Delete'}
					</div>
				</button>
			)}

			{msg?.messagePhoto?.length > 0 && (
				<div ref={messageBox} className="flex-col relative items-start w-fit h-full mx-auto space-y-3">
					{msg?.messagePhoto?.map((_, photoIndex) => (
						<div key={photoIndex} className="relative overflow-hidden max-w-lg border rounded-xl border-gray-200">
							{msg?.sourceId === sender_id && (
								<button disabled={deleteStatus} className={`right-12 top-2 absolute w-fit h-fit ${deleteStatus ? 'opacity-5 animate-pulse cursor-wait' : ''}`}>
									<svg onClick={() => handleDeleteMessage(msg?._id, index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 rounded-md opacity-90 bg-[#6e8ee1] p-1 cursor-pointer">
										<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
									</svg>
								</button>
							)}
							<svg onClick={() => handleDownloadImage(msg?.messagePhoto[photoIndex]?.base64, msg?.messagePhoto[photoIndex]?.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 absolute rounded-md opacity-90 right-2 top-2 bg-[#6e8ee1] p-1 cursor-pointer">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
							</svg>
							<img className="h-auto w-80 sm:max-w-96 max-h-40 object-cover" src={msg?.messagePhoto[photoIndex]?.base64 || postImagErr} onError={(e) => (e.target.src = postImagErr)} alt={`imgErr-${photoIndex}`} />
							{/* <div className="text-red-500 text-xs italic">{position.toFixed(2)} {position > 0 ? 'Below' : 'Above'}</div> */}
						</div>
					))}
				</div>
			)}

			{msg?.message && (
				<div ref={messageBox} className={`relative px-4 py-2 rounded-[15px] max-w-2xl ${msg?.sourceId === sender_id ? 'bg-[#708fe3] text-white shadow-[1px_2px_1px_gray]' : 'bg-gray-200'}`}>
					<div className="font-sans pr-3">{msg?.message}</div>
					{msg?.sourceId === sender_id && (
						<>
							<svg onClick={() => deleteMessage === null ? setDeleteMessage(index) : deleteMessage === index ? setDeleteMessage(null) : setDeleteMessage(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 absolute right-2 top-2 cursor-pointer active:opacity-50">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
							</svg>
						</>
					)}
					{msg?.sourceId === sender_id && (
						<svg xmlns="http://www.w3.org/2000/svg" fill={`${(msg?.seen === 1 || seenMessage.includes(msg?._id)) ? 'blue' : ''}`} className="bi bi-check2-all h-4 w-4 bottom-0 absolute right-6" viewBox="0 0 16 16">
							<path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
							<path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
						</svg>
					)}
					{/* <div className="text-red-500 text-xs italic">{position.toFixed(2)}{position > 0 ? 'Below' : 'Above'}</div> */}
				</div>
			)}

			<div className="text-right font-extralight font-italic font-mono text-[10px] md:text-[12px] select-none">
				{moment(msg?.createdAt).format('h:mm A, DD/MMM/YYYY')}
			</div>
		</div>
	);
};

export default MessageContent;