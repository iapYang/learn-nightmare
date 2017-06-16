const Nightmare = require('nightmare');
const vo = require('vo');

const login = require('./login');
const refresh = require('./refresh');

const nightmare = new Nightmare({
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
});

const url = 'https://www.taobao.com/?spm=a1z0f.1.0.12.Usfqh6';
const tmLink = 'https://detail.tmall.com/item.htm?id=526006447112&spm=a21bz.7725273.1998564503.1.MhskeM&umpChannel=qianggou&u_channel=qianggou&sku_properties=1627207:13999134';

const tbLink = 'https://item.taobao.com/item.htm?id=36393309699&ali_refid=a3_430584_1006:1103278010:N:%E5%AE%B6%E5%85%B7:338660ae8a446f4ef0e8f862df61f52c&ali_trackid=1_338660ae8a446f4ef0e8f862df61f52c&spm=a219r.lm5704.14.1.4MDaGf#detail';

/* eslint func-style: 0 */
const run = function* () {
    // step1: login
    yield nightmare
        .viewport(1280, 800)
        .goto(url)
        .wait('.site-nav-menu-hd .h')
        .click('.site-nav-menu-hd .h')
        .wait('#J_Quick2Static')
        // for now you can use QR scan
        // wait for page redirect
        .wait('#q')
        .goto(tbLink);

    // step2: refresh the page util you got what you want
    let ifExist = false;

    while (!ifExist) {
        yield nightmare
            .refresh()
            .exists('.J_LinkBuy')
            .then(result => {
                ifExist = result;
                console.log('if exist:', ifExist);
            });
    }

    // step3: buy your thing
    yield nightmare
        .wait('.J_Prop.tb-prop.tb-clear')
        .click('.J_Prop.tb-prop.tb-clear dd ul li:nth-child(1)');

    return 'success!';
};

vo(run)((err, result) => {
    if (err) console.error(err);
    console.log(result);
});
