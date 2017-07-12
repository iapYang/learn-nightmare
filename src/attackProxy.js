const Nightmare = require('nightmare');
const vo = require('vo');
const axios = require('axios');

let proxys;

const youkuUrl = 'http://v.youku.com/v_show/id_XNTY3NTUzMjg4.html';
const url = 'http://blog.orzy.me/archives/77';

let times = 0;
const {
    attackBlog,
} = require('./attackUtils');

/* eslint func-style: 0 */
const attack = function* () {
    yield axios
        .get('http://dev.kuaidaili.com/api/getproxy/?orderid=949976764312645&num=100&area=%E4%B8%AD%E5%9B%BD&b_pcchrome=1&b_pcie=1&b_pcff=1&protocol=1&method=2&an_an=1&an_ha=1&sep=3')
        .then(response => {
            proxys = response.data.split(' ');
        });

    for (let i = 0; i < proxys.length; i++) {
        const nightmare = new Nightmare({
            show: true,
            gotoTimeout: 30 * 60 * 1000,
            waitTimeout: 30 * 60 * 1000,
            dock: true,
            // openDevTools: {
            //     mode: 'detach',
            // },
            switches: {
                'proxy-server': proxys[i],
                'ignore-certificate-errors': true,
            },
        });

        console.log(proxys[i]);

        yield attackBlog(nightmare, 'https://blog.h5devhoward.com/2017/06/09/wordpress-config/');
        yield nightmare.end();

        times += 1;
        console.log(`attacked ${times}.`);
    }

    return '2333333';
};

vo(attack)((err, result) => {
    if (err) console.error(err);
    console.log(result);
});
