const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const { Server } = require("socket.io");
const io = new Server(server);



app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/public/chatroom.html")
});

io.on("connection", (socket) => {
  
    socket.broadcast.emit("newclientconnect", {description: "A new user joined"})

    console.log("A user connected");

    socket.on("chat message", (msg) =>{
        io.emit("chat message", msg);
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected.")
        
    })
})

server.listen(port, () => {
    console.log(`listening on ${port}`);
})