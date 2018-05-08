var variable = require('./variable'),
    search = require('./search'),
    tool = require('./tool'),
    pagination = require('./pagination'),
    list = require('./user_list');

function detect_submit() {
    variable.form.addEventListener('submit', function (e) {
        e.preventDefault();

        variable.set_keyword(variable.input.value);        

        search.user(variable.get_keyword(), function (data) {
            list.render_user_list(data.items);
            list.render_sum_total(variable.get_amount());
            pagination.render_pagination(variable.get_amount());
        });
    });
}

function add_event() {
    detect_submit();
    tool.click_top();
    // pagination.detect_click_pagination();
}

module.exports = {
    add_event: add_event
};