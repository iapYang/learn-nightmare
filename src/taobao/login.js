module.exports = function(nightmare, url) {
    let loginSuccess = false;

    nightmare
        .viewport(1280, 800)
        .goto(url)
        .wait('.site-nav-menu-hd .h')
        .click('.site-nav-menu-hd .h')
        .wait('#J_Quick2Static')
        .once('did-get-redirect-request', () => {
            loginSuccess = true;
        })
        .wait('#q');
};
