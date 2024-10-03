const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const connectDB = require("./DatabseConnection/connection.js");
const { scheduleCronJob } = require('./Routes/cronApi.js');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
};

app.use(corsMiddleware);

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024, // Maximum data size for WebSocket requests
    cors: {
        origin: process.env.REACT_APP_API_SOCKET_NETWORK,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {

    // Handle joining a room
    socket.on('join_room', (room) => {
        if (room) {
            socket.join(room);
            io.to(room).emit('user_joined', socket.id);
        } else {
            console.log(`Invalid room: ${room}`);
        }
    });

    // Handle message sending
    socket.on('send_message', async (data) => {
        const { convoId, sourceId, reciverId, message, messagePhoto } = data;

        // Validate the data
        if (!convoId || !sourceId || !reciverId || !(message || messagePhoto)) {
            console.error("Missing required data:", data);
            return;
        }

        try {
            // Join the conversation room
            socket.join(convoId);

            // Save and forward the message
            const result = await sendMessage(data);
            io.to(convoId).emit('forward_message', { content: data, result: result });
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on('disconnect', () => {
        return false;
    });
});

// Include existing routes
app.use("/auth", require('./authRoutes.js'));
app.use("/auth", require('./Routes/postRoutes'));
app.use("/auth", require('./Routes/friendRoutes'));
app.use("/auth", require('./Routes/articleRoutes'));
app.use("/auth", require('./Routes/messageRoutes'));
app.use("/auth", require('./Routes/settingRoutes'));
app.use("/auth", require('./Routes/searchedRoutes'));
app.use("/auth", require('./Routes/scheduledRoutes'));
app.use("/auth", require('./Routes/userInfo'));

// Schedule cron jobs
scheduleCronJob();

// Start the server on the defined port
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
