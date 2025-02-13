const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
const auth = require("./login/loginAuth");
const signupAuth = require("./signup/signupAuth");
const eventRoutes = require("./routes/eventRoutes");
const { connectDB } = require("./config/database");
const socketHandler = require("./socketHandler"); // Import socketHandler

const app = express();
const server = http.createServer(app);

// CORS configuration for HTTP requests
app.use(
  cors({
    origin: [process.env.ORIGIN_2], // Allow your frontend to access the server
    methods: ["GET", "POST"],
  })
);

// Socket.io initialization with CORS configuration
const io = socketIO(server, {
  cors: {
    origin: [process.env.ORIGIN_2], // Allow your frontend to access WebSocket
    methods: ["GET", "POST"], // Allow necessary methods
    credentials: true, // Allow cookies if needed
  },
  maxHttpBufferSize: 1e6, // Increase buffer size
  pingTimeout: 60000, // Prevent frequent disconnects
  transports: ["websocket"], // Use WebSocket only
});

io.sockets.setMaxListeners(0); 

app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api", auth);
app.use("/api", signupAuth);
app.use("/api", eventRoutes(io));

// Socket.IO for real-time updates
io.on("connection", socketHandler); // Corrected this line

// Start the server
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
