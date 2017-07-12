const Nightmare = require('nightmare');
const vo = require('vo');

const youkuUrl = 'http://v.youku.com/v_show/id_XNTY3NTUzMjg4.html';
const url = 'http://blog.orzy.me/archives/77';

let times = 0;
const {
    attackBlog,
} = require('./attackUtils');

/* eslint func-style: 0 */
const attack = function* () {
    for (let i = 0; i < 1; i++) {
        const nightmare = new Nightmare({
            show: true,
            gotoTimeout: 30 * 60 * 1000,
            waitTimeout: 30 * 60 * 1000,
            dock: true,
            // openDevTools: {
            //     mode: 'detach',
            // },
            switches: {
                'proxy-server': '206.127.88.18:80',
                'ignore-certificate-errors': true,
            },
        });

        yield nightmare
            .goto('https://hide.me/en/proxy')
            .wait('#u')
            .insert('#u', 'https://blog.h5devhoward.com/2017/06/09/wordpress-config/')
            .wait('#hide_register_save')
            .click('#hide_register_save');

        yield attackBlog(nightmare);
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
