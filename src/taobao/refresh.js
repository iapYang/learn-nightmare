module.exports = function (nightmare, url) {
    const promises = [];

    for (let i = 0; i < 5; i++) {
        promises.push(nightmare
            .goto(url)
            .title()
            .then()
        );
    }

    promises.reduce((accumulator, promise) =>
        accumulator.then(results =>
            promise.then(title => {
                results.push(title);

                return results;
            })
        )
    , Promise.resolve([]))
    .then(results => {
        nightmare.end(() => {
            console.dir(results);
            console.log('done');
        });
    });
};
