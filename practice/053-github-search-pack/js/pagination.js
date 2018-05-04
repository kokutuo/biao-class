var el = require('./element');

function render_pagination() {
    show_pagination();

    for(var i = 1; i <= 5; i++) {
        var num = i;
        var btn = document.createElement('button');
        btn.classList.add('pager');
        btn.innerText = num;
        el.get_pagination().innerHTML = btn;
    }
}

function show_pagination() {
    el.get_pagination_container().hidden = false;
}

module.exports = {
    render_pagination: render_pagination
};