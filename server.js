const express = require("express");
const http = require("http");
// const cors = require("cors");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 6066;
// const index = require("./routes/index");

const app = express();
app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

app.listen(9000, () => console.log("Server Running On Port: PORT"));

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

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
