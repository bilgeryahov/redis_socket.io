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

const aroundLoc = (long, lat, miles) => {
	return new Promise((resolve, reject) => {
		client.georadius('places', long, lat, miles, 'mi', 'WITHDIST', promiser(resolve, reject));
	});
};

const aroundSB = (miles) => {
	return new Promise((resolve, reject) => {
		client.georadiusbymember('places', 'South Bend', miles, 'mi', 'WITHDIST', promiser(resolve, reject));
	});
};

module.exports = {
	aroundLoc: aroundLoc,
	aroundSB: aroundSB,
	client: client
};