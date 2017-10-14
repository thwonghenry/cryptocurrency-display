const index = require('./index');
const { interval } = require('./config.json');

index();
setInterval(index, interval * 1000);
