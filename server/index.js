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
