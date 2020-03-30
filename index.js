

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);    
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

