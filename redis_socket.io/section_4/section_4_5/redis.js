const config = require('./config.json');
const redis  = require('redis');

const client = redis.createClient(config.redis.port, config.redis.host);

const promiser = (resolve, reject) => {
	return (err, data) => {
		if (err) {
			reject(err);
		}
		resolve(data);
	};
};

const storeUser = (socketID, user) => {
	return new Promise((resolve, reject) => {
		client.setex(socketID, parseInt(config.redis.expire), user, promiser(resolve, reject));
	});
};

const getUser = (socketID) => {
	return new Promise((resolve, reject) => {
		client.get(socketID, promiser(resolve, reject));
	});
};

module.exports = {
	storeUser,
	getUser
};