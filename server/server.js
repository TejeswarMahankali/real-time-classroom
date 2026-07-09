const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("board-update", (text) => {
  io.emit("board-update", text);
});

socket.on("show-image", (imageUrl) => {
  io.emit("show-image", imageUrl);
});

  socket.on("show-quiz", (quiz) => {
     console.log("Quiz received:", quiz);
  io.emit("show-quiz", quiz);
});
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});