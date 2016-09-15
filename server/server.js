var express = require('express');

var app = express();
var server = require('http').Server(app);
var port = 3000 || process.env.PORT;
// var io = require('socket.io')(server);
var index = require('./routes/index');
// var paintModule = require('./modules/paint');

// io.on('connection', function(socket){
//   socket.on('error', function(err){
//     console.log('socket error:', err);
//   });
//
//   socket.emit('connection');
//
//   paintModule.startPainting(socket);
//   // paintModule.sendFrame(socket);
// });

app.use(express.static('server/public'));

app.use('/', index);

server.listen(port, function(){
  console.log('server listening on port', port + '...');
})
