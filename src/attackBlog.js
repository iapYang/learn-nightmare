const Nightmare = require('nightmare');
const vo = require('vo');

const {
    attackBlog,
} = require('./attackUtils');

const nightmare = new Nightmare({
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
    // 'proxy-server': '127.0.0.1:1080',
    // 'ignore-certificate-errors': true,
});

const url = 'https://blog.h5devhoward.com/2017/06/09/wordpress-config/';
const joshua = 'http://blog.orzy.me/archives/19';

nightmare.viewport(1280, 1280);

/* eslint func-style: 0 */
const attack = function* () {
    const condition = true;
    let times = 0;
    while (condition) {
        yield nightmare
            .goto(url)
            .scrollTo('100%', 0);
        yield attackBlog(nightmare);
        yield nightmare.wait(20 * 1000);

        times += 1;
        console.log(`attacked ${times}.`);
    }

    return '233333';
};

vo(attack)((err, result) => {
    if (err) console.error(err);
    console.log(result);
});
