var variable = require('./variable');

function render_pagination() {
    show_pagination();
    clear_pagination();
    var amount = variable.get_amount();

}

function show_pagination() {
    variable.pagination_container.hidden = false;
}

function clear_pagination() {
    variable.pagination.innerHTML = '';
}