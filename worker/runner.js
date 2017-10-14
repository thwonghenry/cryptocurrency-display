const index = require('./index');
const init = require('./db/init');
const { interval } = require('./config.json');

(async () => {
    await init();
    index();
    setInterval(index, interval * 1000);    
})();
