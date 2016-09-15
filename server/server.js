var express = require('express');

var app = express();
var server = require('http').Server(app);
var port = 3000 || process.env.PORT;
var io = require('socket.io')(server);
var index = require('./routes/index');

app.use(express.static('server/public'));

app.use('/', index);

server.listen(port, function(){
  console.log('server listening on port', port + '...');
})
