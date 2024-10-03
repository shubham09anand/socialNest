const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Database connection
const connectDB = require("./DatabseConnection/connection.js");

// Import routes
const { scheduleCronJob } = require('./Routes/cronApi.js');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' })); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024, // Maximum data size for WebSocket requests
    cors: {
        origin: "http://13.202.210.238:3000", // Replace with your frontend URL
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Connect to the database
connectDB();

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

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

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
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

// Start the server
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
