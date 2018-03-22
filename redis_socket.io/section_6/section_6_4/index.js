const express  = require('express');
const socketio = require('socket.io');
const process  = require('process');
const config   = require('./config');
const socketioRedis = require('socket.io-redis');

const app 	   = express();
const server   = app.listen(process.argv[2]);
const io       = socketio(server);

app.use(express.static('static'));

io.adapter(socketioRedis({ host: config.redis.host, port: config.redis.port }));

io.on('connection', (socket) => {
	socket.on('room.join', (room) => {
		console.log(socket.rooms);
		Object.keys(socket.rooms)
			.filter((r) => r !== socket.id)
			.forEach((r) => socket.leave(r));

		setTimeout(() => {
			socket.join(room);
			socket.emit('event', 'Joined room ' + room);
			socket.broadcast.to(room).emit('event', 'Someone joined room ' + room);
		}, 0);
	});

	socket.on('event', (e) => {
		console.log(e);
		socket.broadcast.to(e.room).emit('event', e.name + ' says hello!');
	});
});