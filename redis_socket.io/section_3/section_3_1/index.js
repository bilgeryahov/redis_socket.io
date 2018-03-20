const express = require('express');
const config  = require('./config.json');
const redis   = require('redis');

const app = express();

// connect to Redis
const redisClient = redis.createClient(config.redis.port, config.redis.host);
redisClient.set('REDIS_KEY', 0);

app.get('/', (req, res) => {
	redisClient.incr('REDIS_KEY');
	redisClient.get('REDIS_KEY', (err, data) => {
		res
			.status(200)
			.json( { REDIS_KEY: data } );
	});
});

app.listen(8080);