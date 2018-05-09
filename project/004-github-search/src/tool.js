var variable = require('./variable');

function click_top() {
    variable.top.addEventListener('click', function () {
        window.scrollTo(0, 0);
    });
}

module.exports = {
    click_top: click_top
};