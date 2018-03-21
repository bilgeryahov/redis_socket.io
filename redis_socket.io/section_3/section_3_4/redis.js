const config = require('./config.json');
const redis  = require('redis');

const client = redis.createClient(config.redis.port, config.redis.host);

const promiser = (resolve, reject) => {
	return (err, data) => {
		if (err) {
			reject(err);
		} else if (data) {
			resolve(data);
		}
	};
};

const get = (key) => {
	return new Promise((resolve, reject) => {
		client.get(key, promiser(resolve, reject));
	});
};

const hgetall = (key) => {
	return new Promise((resolve, reject) => {
		if (key === null) {
			reject();
		} else {
			client.hgetall(key, promiser(resolve, reject));
		}
	});
};

const zrevrangebyscore = (key, max, min) => {
	return new Promise((resolve, reject) => {
		client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
	});
};

module.exports = {
	get: get,
	hgetall: hgetall,
	zrevrangebyscore: zrevrangebyscore,
	client: client
};