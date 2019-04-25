var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require('socket.io')(http);

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

var block = require("./block.js");
var chain = require("./chain");

var blockchain = new chain();

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/main.html");
})

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
    socket.on('block', function(block){
        blockchain.addBlock(block.name, block.value);
        io.emit("block", blockchain.getLast());
    });
});

http.listen(4040, () => {
    console.log("Listening on port 4040");
});