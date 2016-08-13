'use strict';
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 3005;

// use th parent
app.use(express.static(__dirname + '/build'));

server.listen(port, () => {
  console.log('Server listening on port %d', port);
});

io.on('connection', (socket) => {
  console.log('user connected');

  // on joining a room
  socket.on('join', (data) => {
    socket.join(data.room);
  });

  // on leaving a room
  socket.on('leave', (data) => {
    socket.leave(data.room);
    // note: on disconnect of client/socket it automatically
    // leaves all the rooms it has joined.
  });

  // on recieving a ping from a client
  socket.on('ping', (data) => {
    io.in(data.room).emit(data);
  });

  // on user disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
