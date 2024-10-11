const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const connectDB = require("./DatabseConnection/connection.js");
const { scheduleCronJob } = require('./Routes/cronApi.js');
const { sendMessage } = require("./Controller/Messages/sendMessage.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ['http://socialnest.shubham09anand.in', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200
}));


const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    maxHttpBufferSize: 12 * 1024 * 1024,
    cors: {
        origin: 'http://127.0.0.1:3000',
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
