const $ = require('jquery');
const Promise = require('bluebird');

const nightmare = require('nightmare')({
    Promise,
    openDevTools: {
        mode: 'detach',
    },
    show: true,
    waitTimeout: 30 * 60 * 1000,
});

nightmare
    .viewport(1280, 800)
    .goto('https://detail.tmall.com/item.htm?id=526006447112&spm=a21bz.7725273.1998564503.1.MhskeM&umpChannel=qianggou&u_channel=qianggou&sku_properties=1627207:13999134')
    // .wait('.J_TSaleProp li:nth-child(4) a')
    // .click('.J_TSaleProp li:nth-child(4) a')
    // .click('.J_LinkBuy')

    .wait('a.sn-login')
    .click('a.sn-login')
    // for login wait qr scan
    .wait(30 * 1000)
    .catch(error => {
        console.error('Search failed:', error);
    });

function loop() {
    let ifLinkBuyExists = false;
    nightmare
        .exists('.J_LinkBuy')
        .then(ifExists => {
            console.log('in');
            ifLinkBuyExists = ifExists;
        });

    if (ifLinkBuyExists) {
        console.log('exists');
    } else {
        console.log('not exists');
        nightmare
            .refresh()
            .wait('body');
        loop();
    }
}
