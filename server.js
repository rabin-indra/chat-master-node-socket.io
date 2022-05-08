const { on } = require("events");
const express = require("express");
const app = express();                              //express is a function
 
const http = require("http").createServer(app);     //create server
// const PORT = process.env.PORT || 8000;              // defining port number


http.listen(8000, () => {
    console.log(`Listening from port 8000`);     
});

// routing
app.use(express.static(__dirname + '/public'));     //giving direction to server for css file
app.get('/', (req, res) => {                        //if the url is / than server will response hello world
    res.sendFile(__dirname + '/index.html')         //send our html file to server
});


// socket

const io = require("socket.io")(http);

io.on('connection', (socket) => {
    console.log("Connected...");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
});
