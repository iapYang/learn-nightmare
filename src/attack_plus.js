const Nightmare = require('nightmare');
const vo = require('vo');
const axios = require('axios');
const Chance = require('chance');

const chance = new Chance();

let proxys;

const youkuUrl = 'http://v.youku.com/v_show/id_XNTY3NTUzMjg4.html';
const url = 'http://blog.orzy.me/archives/77';
let times = 0;

/* eslint func-style: 0 */
const youku = function* () {
    yield axios
        .get('http://dev.kuaidaili.com/api/getproxy/?orderid=949976764312645&num=100&area=%E4%B8%AD%E5%9B%BD&b_pcchrome=1&b_pcie=1&b_pcff=1&protocol=1&method=2&an_an=1&an_ha=1&sep=3')
        .then(response => {
            proxys = response.data.split(' ');
        });

    console.log(proxys);

    for (let i = 0; i < proxys.length; i++) {
        const nightmare = new Nightmare({
            show: true,
            gotoTimeout: 30 * 60 * 1000,
            waitTimeout: 30 * 60 * 1000,
            dock: true,
            openDevTools: {
                mode: 'detach',
            },
            switches: {
                'proxy-server': proxys[i],
                'ignore-certificate-errors': true,
            },
        });

        console.log(proxys[i]);

        yield nightmare
            // .refresh()
            .viewport(1280, 800)
            .goto(youkuUrl)
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
            // .wait(10 * 1000)
            .end();

        times += 1;
        console.log(`attacked ${times}.`);
    }

    return '2333333';
};

vo(youku)((err, result) => {
    if (err) console.error(err);
    console.log(result);
});
