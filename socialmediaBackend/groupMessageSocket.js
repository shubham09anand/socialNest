const { Server } = require('socket.io');
const { GroupMessage } = require('./Controller/Group/GroupMessage/GroupMessaging');

const groupSocket = (server) => {

     const io = new Server(server, {
          maxHttpBufferSize: 12 * 1024 * 1024,
          cors: {
               origin: '*',
               methods: ['GET', 'POST'],
               credentials: true
          }
     });

     io.on('connection', (socket) => {

          // Handle joining a room
          socket.on('join_group_room', (room) => {
               if (room) {
                    socket.join(room);
                    io.to(room).emit('group_user_joined', socket.id);
               } else {
                    console.log(`Invalid room: ${room}`);
               }
          });

          // Handle message sending
          socket.on('send_group_message', async (data) => {
               const { groupId, userName, firstName, lastName, senderId, message, messagePhoto } = data;

               // Validate the data
               if (!groupId || !senderId || !userName || !firstName || !lastName || !(message || messagePhoto)) {
                    return 0;
               }

               try {
                    // Join the conversation room
                    socket.join(groupId);

                    // Save and forward the message
                    const result = await GroupMessage(data);
                    io.to(groupId).emit('forward_group_message', { content: data, result: result });
                    
               } catch (error) {
                    console.error("Error saving message:", error);
               }
          });

          socket.on('group_disconnect', () => {
               return false;
          });
     });

}

module.exports = { groupSocket }