const { initSocket } = require('./socketManager');
const { GroupMessage } = require('./Controller/Group/GroupMessage/GroupMessaging');

const groupSocket = (server) => {
     const io = initSocket(server); // Get shared io instance
     const socket_2 = io.of('/socket_2');

     socket_2.on('connection', (socket) => {
          socket.on('join_group_room', (room) => {
               if (room) {
                    socket.join(room);
                    socket_2.to(room).emit('group_user_joined', socket.id);
               } else {
                    console.log(`Invalid room: ${room}`);
               }
          });

          socket.on('send_group_message', async (data) => {
               const { groupId, userName, firstName, lastName, senderId, message, messagePhoto } = data;

               if (!groupId || !senderId || !userName || !firstName || !lastName || !(message || messagePhoto)) {
                    return 0;
               }

               try {
                    socket.join(groupId);
                    const result = await GroupMessage(data);
                    socket_2.to(groupId).emit('forward_group_message', { content: data, result: result });
               } catch (error) {
                    console.error("Error saving message:", error);
               }
          });

          socket.on('disconnect', () => {
               console.log("Client disconnected:", socket.id);
          });
     });
};

module.exports = { groupSocket };
