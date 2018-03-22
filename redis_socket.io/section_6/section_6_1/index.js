const express  = require('express');
const session  = require('express-session');
const socketio = require('socket.io');

const app 	   = express();
const server   = app.listen(8080);
const io       = socketio(server);

const sessionMiddleware = session({
	secret: 's3cr37',
	resave: false,
	saveUninitialized: true
});

// setup Express to use middleware
app.use(sessionMiddleware);
app.use((req, res, next) => {
	console.log(`From Express: ${req.session.name}`);
	next();
});
app.use(express.static('static'));

// socket.io middleware
io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

io.on('connection', (socket) => {
	console.log(socket.request.session);
	if (socket.request.session.name !== undefined) {
		socket.emit('name', socket.request.session.name);
		io.emit('event', socket.request.session.name + ' has joined!');
	}

	socket.on('name', (name) => {
		socket.request.session.name = name;
		socket.request.session.save();
		socket.broadcast.emit('event', name + ' says hello');
	});
});