const Nightmare = require('nightmare');

const login = new Nightmare({
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
    dock: true,
});

login
    .viewport(1280, 800)
    .goto('https://detail.tmall.com/item.htm?id=526006447112&spm=a21bz.7725273.1998564503.1.MhskeM&umpChannel=qianggou&u_channel=qianggou&sku_properties=1627207:13999134')
    // .wait('.J_TSaleProp li:nth-child(4) a')
    // .click('.J_TSaleProp li:nth-child(4) a')
    // .click('.J_LinkBuy')

    .wait('a.sn-login')
    .click('a.sn-login')
    // for login wait qr scan
    .wait(30 * 1000);

login
    // .wait()
    .refresh()
    .wait('body');

const show = false;

login.exists('.J_LinkBuy')
    .then(text => {
        console.log(text);
    });

login
    .wait()
    .refresh()
    .wait('body')
    .end(() => 'some value');
// loop();
