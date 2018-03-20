const express = require('express');
const config  = require('./config.json');
const process = require('process');
const redis   = require('redis');

const app = express();

// connect to Redis
const redisClient = redis.createClient(config.redis.port, config.redis.host);
const publishClient = redis.createClient(config.redis.port, config.redis.host);

redisClient.on('message', (channel, message) => {
	console.log(message);
});

redisClient.subscribe('REQUESTS');

app.get('/', (req, res) => {
	publishClient.publish('REQUESTS', `Request on ${req.socket.localPort} for ${req.url}`);
	console.log(`Local log for ${req.url}`);
	res
		.status(200)
		.json( { success: true } );
});

app.listen(process.argv[2]);