import React, { useEffect, useRef, useState } from 'react';
import noProfilePicture from '../../Assets/NoProileImage.png';
import SendMessage from './SendMessage';
import LoadChat from "../Animation/LoadChat";
import MessageContent from './MessageContent';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMessage } from './MessageFunction';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';

const MessageSection = ({ userPhoto }) => {

    const queryClient = useQueryClient();
    const boxRef = useRef(null);
    const navigate = useNavigate();
    const [seenMessage, setSeenMessage] = useState([]);
    const [conversation, setConversation] = useState(null);
    const sender_id = useSelector((state) => state.messageSlice.senderId);
    const reciver_id = useSelector((state) => state.messageSlice.receiverId);
    const reciver_photo = useSelector((state) => state.messageSlice.reciverPhoto);

    useEffect(() => {
        if (!sender_id || !reciver_id || sender_id === "null" || reciver_id === "null") {
            navigate("/message");
        }
    }, [sender_id, reciver_id, navigate]);

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: (['getMessage', sender_id, reciver_id]),
        queryFn: ({ pageParam = 1 }) => getMessage({ sender_id, reciver_id, page: pageParam }),
        enabled: !!sender_id && !!reciver_id,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.flatMap(page => page.conversationHistory).length;
            return totalFetched < lastPage.totalMessage ? allPages.length + 1 : undefined;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });

    useEffect(() => {
        if (conversation?.result?.createdMessage) {
            const newMessage = conversation.result.createdMessage;
            const newMessageId = newMessage?._id;

            // Check if the new message already exists in the conversation history
            queryClient.setQueryData(['getMessage', sender_id, reciver_id], (oldData) => {
                if (!oldData) return oldData;

                const existingMessages = oldData.pages[0]?.conversationHistory || [];

                if (existingMessages.some(msg => msg._id === newMessageId)) {
                    return oldData;
                }

                return {
                    ...oldData,
                    pages: [
                        {
                            ...oldData.pages[0],
                            conversationHistory: [newMessage, ...existingMessages]
                        },
                        ...oldData.pages.slice(1)
                    ]
                };
            });

            scrollToBottom();
        }
    }, [conversation, queryClient, sender_id, reciver_id]);

    const scrollToBottom = (forceScroll = false) => {
        if (!boxRef.current) return;

        const isUserNearBottom =
            boxRef.current.scrollHeight - boxRef.current.scrollTop <= boxRef.current.clientHeight + 100;

        if (forceScroll || isUserNearBottom || data?.pages?.length === 1) {
            boxRef.current.scrollTo({
                top: boxRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    // Scroll on initial load & new message
    useEffect(() => {
        scrollToBottom();
    }, [data, conversation]);

    useEffect(() => {
        const contactListCache = queryClient.getQueryData(['contactList', sender_id]);

        if (contactListCache) {
            queryClient.setQueryData(['contactList', sender_id], (oldData) => {
                return {
                    ...oldData,
                    chatList: oldData.chatList.map((item) => {
                        if (item?._id === reciver_id && item.unreadCount > 0) {
                            return { ...item, unreadCount: 0 };
                        }
                        return item;
                    }),
                };
            });
        }
    })

    return (
        <div className="lg:w-[80%] h-[calc(100%-160px)] md:h-[calc(100%-170px)] right-0 absolute mt-14 lg:mt-[104px] space-y-5 example w-full overflow-y-scroll">
            {isLoading && <LoadChat />}

            {isError ? (
                <div className='text-lg text-gray-400 font-semibold w-full text-center'>
                    Network Error
                </div>
            ) : (
                <div ref={boxRef} className="h-full rounded-3xl text-sm font-medium space-y-3 p-3 overflow-y-scroll example">
                    {hasNextPage && (
                        <div className="flex justify-center">
                            <button className="px-4 py-2 rounded-lg cursor-pointer active:opacity-50 hover:opacity-75 shadow-[2px_2px_2px_gray] font-semibold" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                {isFetchingNextPage ? "Loading..." : "Load Older Messages"}
                            </button>
                        </div>
                    )}

                    {(!data?.pages?.flatMap(page => page.conversationHistory)?.length) ? (
                        <div className="text-center text-gray-500 mt-4">
                            No Conversation Exists
                        </div>
                    ) : (
                        <>
                            {[...data?.pages?.flatMap(page => page.conversationHistory)].reverse().map((msg, index) => (
                                <div id={msg._id} key={msg._id} className={`flex gap-3 ${msg.sourceId === sender_id ? 'flex-row-reverse items-end' : ''}`}>
                                    <img src={(msg.sourceId === sender_id ? userPhoto : reciver_photo) || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="user" className={`${msg.sourceId === sender_id ? 'select-none w-9 h-9 rounded-full shadow object-contain -translate-y-4' : 'select-none w-9 h-9 rounded-full shadow object-contain'}`} />
                                    <div className="flex flex-col space-y-2">
                                        <MessageContent setSeenMessage={setSeenMessage} seenMessage={seenMessage} msg={msg} index={index} />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}

            <SendMessage userPhoto={userPhoto} setConversation={setConversation} />
        </div>
    );
};

export default MessageSection;