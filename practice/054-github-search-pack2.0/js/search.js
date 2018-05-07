var send = require('./send');

function user(kwd, on_suceess, config) {
    var def = {
        current_page: 1,
        limit: 10
    };

    config = Object.assign({}, def, config);

    send.send('https://api.github.com/search/users?q=' + kwd + '&page=' + config.current_page +
        '&per_page=' + config.limit, on_suceess);
}

module.exports = {
    user: user
};