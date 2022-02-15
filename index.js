const express = require("express");
const socketIo = require("socket.io");
const PORT = process.env.PORT || 6066;

const server = express()
  .use((req, res) => res.send({ response: "I am alive" }).status(200))
  .listen(PORT, () => console.log(`listening on ${PORT}`));

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected, socket ID: " + socket.id);
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });
  socket.on("message", (msg, roomId) => {
    io.to(roomId).emit("message", msg, roomId);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
