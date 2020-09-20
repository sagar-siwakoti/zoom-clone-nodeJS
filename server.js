//import statement
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});
//setting the rooms wuth UUID
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

//added connection with socket
io.on("connection", (socket) => {
  socket.on("join-room", (roomId,userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected",userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
    });
  });
});

server.listen(process.env.PORT || 3000);
