const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
const auth = require("./login/loginAuth");
const signupAuth = require("./signup/signupAuth");
const eventRoutes = require("./routes/eventRoutes");
const { connectDB } = require("./config/database");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [process.env.ORIGIN_2], 
    methods: ["GET", "POST"],
  })
);

const io = socketIO(server, {
  cors: {
    origin: [process.env.ORIGIN_2], 
    methods: ["GET", "POST"], 
    credentials: true, 
  },
  pingTimeout: 60000,
  transports: ["websocket"], 
});

app.use(express.json());

connectDB();

app.use("/api", auth);
app.use("/api", signupAuth);
app.use("/api", eventRoutes(io));

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
}); 

server.listen(8080, () => {
  ("Server running on http://localhost:8080");
});
