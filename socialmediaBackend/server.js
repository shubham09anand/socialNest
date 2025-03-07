const express = require("express");
const http = require("http");
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const connectDB = require("./DatabseConnection/connection.js");
const { scheduleCronJob } = require('./Routes/cronApi.js');
const { groupSocket } = require("./groupMessageSocket.js");
const { sendMessageSocket } = require("./messageSocket.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", process.env.REACT_APP_API_SOCKET_NETWORK, process.env.REACT_APP_BASE_SOCKET_NETWORK, 'http://socialnest.shubham09anand.in', 'https://socialnest.shubham09anand.in'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200
}));

const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sockets for normal message and gorup message
sendMessageSocket(server);
// groupSocket(server)

app.get('/', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(userIP)
    res.json({ ip: userIP });
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
app.use("/auth", require('./Routes/GroupPostRoutes.js'));
app.use("/auth", require('./Routes/GroupMessageRoute.js'));

// Schedule cron jobs
scheduleCronJob();

// Start the server on the defined port
server.listen(port, () => {
    console.log(`Server and Socket.IO are running on port ${port}`);
});
