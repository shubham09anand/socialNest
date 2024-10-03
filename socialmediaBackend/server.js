const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

// Import your database connection and route handlers
const connectDB = require("./DatabseConnection/connection.js");
// const { scheduleCronJob } = require('./Routes/cronApi.js');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080; // Default to port 8080 if not defined

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' })); // Increased limit for JSON payloads
app.use(express.json({ limit: '100mb' })); // Increased limit for JSON payloads
app.use(express.urlencoded({ extended: true }));

// Set up Socket.IO
const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024, // Max data size for WebSocket requests
    cors: {
        origin: '*', // Use wildcard for all origins if not set
        methods: ['GET', 'POST'],
    }
});

// Socket.IO events
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a room
    socket.on('join_room', (room) => {
        if (room) {
            socket.join(room);
            io.to(room).emit('user_joined', socket.id); // Notify others in the room
        } else {
            console.log(`Invalid room: ${room}`);
        }
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
        const { convoId, sourceId, reciverId, message, messagePhoto } = data;

        // Validate incoming data
        if (!convoId || !sourceId || !reciverId || !(message || messagePhoto)) {
            console.error("Missing required data:", data);
            return;
        }

        try {
            socket.join(convoId);
            const result = await sendMessage(data);
            io.to(convoId).emit('forward_message', { content: data, result: result });
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
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
// scheduleCronJob();

// Start the server
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});