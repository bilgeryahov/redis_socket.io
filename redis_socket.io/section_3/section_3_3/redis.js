const config = require('./config.json');
const redis  = require('redis');

const client = redis.createClient(config.redis.port, config.redis.host);

const get = (key) => {
	return new Promise((resolve, reject) => {
		client.get(key, (err, data) => {
			if (err) {
				reject(err);
			} else if (data) {
				resolve(data);
			}
		});
	});
};

const hgetall = (key) => {
	return new Promise((resolve, reject) => {
		if (key === null) {
			reject();
		} else {
			client.hgetall(key, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		}
	});
};

const lrange = (key) => {
	return new Promise((resolve, reject) => {
		client.lrange(key, [0, -1], (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports = {
	get: get,
	hgetall: hgetall,
	lrange: lrange,
	client: client
};