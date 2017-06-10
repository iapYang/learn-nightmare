const nightmare = require('nightmare')({show: true});

nightmare
    .goto('https://www.baidu.com')
    .type('#kw', 'lol')
    .click('#su')
    .wait('#zero_click_wrapper .c-info__title a')
    // .evaluate(() =>
    //     document.querySelector('#zero_click_wrapper .c-info__title a').href
    // )
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Search failed:', error);
    });
