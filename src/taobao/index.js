const Nightmare = require('nightmare');
const login = require('./login');

const nightmare = new Nightmare({
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
});

const url = 'https://www.taobao.com/?spm=a1z0f.1.0.12.Usfqh6';
const buyLink = 'https://detail.tmall.com/item.htm?id=526006447112&spm=a21bz.7725273.1998564503.1.MhskeM&umpChannel=qianggou&u_channel=qianggou&sku_properties=1627207:13999134';

login(nightmare, url);

nightmare
    .wait(20 * 1000)
    .refresh()
    .wait('body')
    .end(() => 'some value');
