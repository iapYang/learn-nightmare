const Chance = require('chance');

const chance = new Chance();

module.exports = {
    attackBlog(nightmare) {
        return nightmare
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
            .click('#submit');
    },
};
