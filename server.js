const express = require("express");
const http = require("http");
// const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 6066;
// const index = require("./routes/index");

const app = express();
// app.use(index);

const server = http.createServer();

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected, socket ID: " + socket.id);

  socket.on("message", (msg, roomId) => {
    console.log(roomId);
    socket.join(roomId);
    io.to(roomId).emit("message", msg, roomId);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
