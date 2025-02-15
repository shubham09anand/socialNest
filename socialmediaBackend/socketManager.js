const { Server } = require('socket.io');

let io; // Shared WebSocket instance

const initSocket = (server) => {
     if (!io) {
          io = new Server(server, {
               maxHttpBufferSize: 12 * 1024 * 1024,
               cors: {
                    origin: [
                         "http://localhost:3000",
                         "http://127.0.0.1:3000",
                         process.env.REACT_APP_API_SOCKET_NETWORK,
                         process.env.REACT_APP_BASE_SOCKET_NETWORK,
                         'http://socialnest.shubham09anand.in:3000',
                         'https://socialnest.shubham09anand.in'
                    ],
                    methods: ['GET', 'POST'],
                    credentials: true
               }
          });
     }
     return io;
};

module.exports = { initSocket };
