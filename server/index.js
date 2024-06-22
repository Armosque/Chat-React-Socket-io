const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
    cors: {origin: "*"},
})

io.on("connection", (socket) => {

  
    socket.on("chat", (data) => {
        console.log(data);
        io.emit("chat",data);
    })
})
server.listen(3000);