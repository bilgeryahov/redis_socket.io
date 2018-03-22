const express  = require('express');
const socketio = require('socket.io');
const routes   = require('./routes');
const sockets  = require('./sockets');

const app 	   = express();
const server   = app.listen(8080);
const io       = socketio(server);

app.use('/', routes);

const bears = io.of('/bears');
const cubs  = io.of('/cubs');

bears.on('connection', sockets.bearsNamespace);
cubs.on('connection', sockets.cubsNamespace);

io.on('connection', (socket) => {

});