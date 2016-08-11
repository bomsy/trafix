'use strict';
let express = require('express');
let app = express();
let server = require('http').Server(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname.replace('/server', '/build')));

server.listen(port, () => {
  console.log('Server listening on port %d', port);
});
