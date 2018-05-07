var variable = require('./variable'),
    search = require('./search'),
    renderU = require('./user_list');

function detect_submit() {
    variable.form.addEventListener('submit', function (e) {
        e.preventDefault();

        variable.set_keyword(variable.input.value);        

        search.user(variable.get_keyword(), function (data) {
            renderU.render_user_list(data.items);
            renderU.render_sum_total(variable.get_amount());
        });
    });
}

function add_event() {
    detect_submit();
}

module.exports = {
    add_event: add_event
};