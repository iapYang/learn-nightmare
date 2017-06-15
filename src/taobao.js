const $ = require('jquery');
const Nightmare = require('nightmare');

const login = new Nightmare({
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
});

const url = 'https://www.taobao.com/?spm=a1z0f.1.0.12.Usfqh6';
const buyLink = 'https://detail.tmall.com/item.htm?id=526006447112&spm=a21bz.7725273.1998564503.1.MhskeM&umpChannel=qianggou&u_channel=qianggou&sku_properties=1627207:13999134';

let loginSuccess = false;

login
    .viewport(1280, 800)
    .goto(url)
    .wait('.site-nav-menu-hd .h')
    .click('.site-nav-menu-hd .h')
    .wait('#J_Quick2Static')
    .once('did-get-redirect-request', () => {
        loginSuccess = true;
    })
    .wait('#q');

console.log('fuck');

login
    .wait()
    .refresh()
    .wait('body');

const show = false;

login
    .exists('.J_LinkBuy')
    .then(text => {
        console.log(text);
    });

login
    .wait()
    .refresh()
    .wait('body')
    .end(() => 'some value');
// loop();
