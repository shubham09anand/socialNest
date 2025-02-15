const { initSocket } = require('./socketManager');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");
const { updateSeenStatus } = require('./Controller/Messages/updateSeenStatus.js');

const sendMessageSocket = (server) => {
    const io = initSocket(server); // Get shared io instance
    const socket_1 = io.of('/socket_1');

    socket_1.on('connection', (socket) => {

        socket.on('join_room', (room) => {
            if (room) {
                socket.join(room);
                socket_1.to(room).emit('user_joined', socket.id);
            } else {
                console.log(`Invalid room ${ room }`);
            }
        });

        socket.on('send_message', async (data) => {
            const { convoId, sourceId, reciverId, message, messagePhoto } = data;

            if (!convoId || !sourceId || !reciverId || !(message || messagePhoto)) {
                console.error("Missing required data:", data);
                return;
            }

            try {
                socket.join(convoId);
                const result = await sendMessage(data);
                socket_1.to(convoId).emit('forward_message', { content: data, result: result });
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        socket.on('message_seen_update', async (data) => {
            const { convoId, messageId } = data;

            if (!convoId || !messageId) {
                return;
            }

            try {

                const result = await updateSeenStatus(data);

                socket_1.to(convoId).emit('message_seen_update_ack', { convoId, result });

            } catch (error) {
                console.error("Error updating message seen status:", error);
            }
        });



        socket.on('disconnect', () => {
            // console.log("Client disconnected:", socket.id);
        });
    });
};

module.exports = { sendMessageSocket };