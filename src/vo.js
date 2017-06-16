const Nightmare = require('nightmare');
const vo = require('vo');

const nightmare = new Nightmare({
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
});

const run = function *() {
    yield nightmare.goto('http://www.sina.com')
        .wait(30 * 1000);

    const results = [];

    for (let i = 0; i < 5; i++) {
        const result = yield nightmare.goto('http://www.baidu.com').title();
        results.push(result);
    }

    return results;
};

// use `vo` to execute the generator function
vo(run)((err, results) => {
    console.dir(results);
});
