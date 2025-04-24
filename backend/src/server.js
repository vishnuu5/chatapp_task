const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB and handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Connect to MongoDB using the config file
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/chat"));

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    if (userId) {
      socket.join(userId);
      console.log("User joined room:", userId);
    }
  });

  socket.on("sendMessage", (data) => {
    try {
      if (!data.senderId || !data.message) {
        throw new Error("Invalid message data");
      }
      
      const messageData = {
        senderId: data.senderId,
        message: data.message,
        timestamp: new Date(),
      };

      // Broadcast to all connected clients
      io.emit("receiveMessage", messageData);
      
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
