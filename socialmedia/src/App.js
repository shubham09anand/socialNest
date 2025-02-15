import "./App.css";
import WebsiteLayout from "./Components/Layout/WebsiteLayout";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { socketUrl } from "./Services/API";
import { useLocation } from "react-router-dom";

function App() {

     const location = useLocation();
     const currPath = location.pathname;
     const queryClient = useQueryClient();
     const [socket, setSocket] = useState(null);
     const sender_id = useSelector((state) => state.messageSlice.senderId);
     const receiver_id = useSelector((state) => state.messageSlice.receiverId);
     const roomID = sender_id && receiver_id ? `${sender_id}${receiver_id}` : null;

     useEffect(() => {

          const s = io(`${socketUrl}/socket_1`);
          setSocket(s)

          if (roomID && s) {
               s.emit("join_room", roomID);
          }

          return () => {
               s.disconnect();
          };
     }, [roomID]);

     useEffect(() => {
          if (!socket) return;

          socket.on("forward_message", (data) => {

               if (!(currPath.startsWith('/message') && currPath.split('/').length === 3)) {
                    queryClient.setQueryData(['getMessage', sender_id, receiver_id], (oldData) => {
                         if (!oldData) return { pages: [{ conversationHistory: [data] }] };
                         return {
                              ...oldData,
                              pages: [
                                   {
                                        ...oldData.pages[0],
                                        conversationHistory: [ data?.result?.createdMessage, ...oldData.pages[0].conversationHistory]
                                   },
                                   ...oldData.pages.slice(1)
                              ]
                         }
                    })
               }
          });

          return () => {
               socket.off("forward_message");
          };
     }, [socket]);

     return (
          <WebsiteLayout />
     );
}
export default App;