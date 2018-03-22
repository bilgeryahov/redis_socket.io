function* bearsScore(){
	yield 'CHI Field Goal CHI 3 - MIN 0';
	yield 'CHI Field Goal CHI 6 - MIN 0';
	yield 'CHI Touchdown CHI 13 - MIN 0';
	yield 'MIN Field Goal CHI 13 - MIN 3';
	yield 'CHI Touchdown CHI 20 - MIN 3';
	yield 'MIN Touchdown CHI 20 - MIN 10';
	yield 'CHI Wins';
}

const bearsNamespace = (socket) => {
	socket.emit('score', 'Welcome to the Bears score update!');
	let score = bearsScore();
	let id = setInterval(() => {
		let next = score.next();
		if (next.done) {
			clearInterval(id);
		} else {
			socket.emit('score', next.value);
		}
	}, 2000);
};

function* cubsScore(){
	yield 'CHC scores CHC 1 - CLE 0';
	yield 'CLE scores CHC 1 - CLE 1';
	yield 'CHC scores CHC 2 - CLE 1';
	yield 'CHC scores CHC 3 - CLE 1';
	yield 'CHC scores CHC 4 - CLE 1';
	yield 'CHC scores CHC 5 - CLE 1';
	yield 'CLE scores CHC 5 - CLE 3';
	yield 'CHC scores CHC 6 - CLE 3';
	yield 'CLE scores CHC 6 - CLE 4';
	yield 'CLE scores CHC 6 - CLE 6';
	yield 'CHC scores CHC 7 - CLE 6';
	yield 'CHC scores CHC 8 - CLE 6';
	yield 'CLE scores CHC 8 - CLE 7';
	yield 'CHC wins';
}

const cubsNamespace = (socket) => {
	socket.emit('score', 'Welcome to the Cubs score update!');
	let score = cubsScore();
	let id = setInterval(() => {
		let next = score.next();
		if (next.done) {
			clearInterval(id);
		} else {
			socket.emit('score', next.value);
		}
	}, 1000);
};

module.exports.bearsNamespace = bearsNamespace;
module.exports.cubsNamespace = cubsNamespace;