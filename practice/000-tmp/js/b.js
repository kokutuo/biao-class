var form = document.getElementById('form'),
    input = document.getElementById('input'),
    keyword;

function get_keyword() {
    return keyword;
}

function click() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        keyword = input.value;
    });
}

module.exports = {
    click: click,
    get_keyword: get_keyword
};