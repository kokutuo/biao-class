var b = require('./b'),
    a = 0;

function add() {
    b.click();
    console.log(a + b.get_keyword());
}

module.exports = {
    add: add
};