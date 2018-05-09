var variable = require('./variable'),
    send = require('./send'),
    search = require('./search'),
    tool = require('./tool'),
    pagination = require('./pagination'),
    history = require('./plugin/history'),
    list = require('./user_list');

function detect_submit() {
    variable.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var keyword = variable.set_keyword(variable.input.value);
        
        history.add(keyword);

        search.user(variable.get_keyword(), function (data) {
            list.render_user_list(data.items);
            list.render_sum_total(send.get_amount());
            pagination.render_pagination();
        });
    });
}

function show_history_list() {
    variable.input.addEventListener('focus', function () {
        history.show();
    });
}

function hidden_history_list() {
    document.addEventListener('click', function (e) {
       var el = e.target; 
       var tmp = el.closest('#history-list');
       
       if (!tmp && el != variable.input) {
           history.hidden();
       }
    });
}

function init_history() {
    history.init({
        el: '#history-list',
        on_click: function (keyword, e) {
            variable.input.value = keyword;
        }
    });
}


function add_event() {
    detect_submit();
    tool.click_top();
    pagination.detect_click_pagination();
    init_history();
    show_history_list();
    hidden_history_list();
}

module.exports = {
    add_event: add_event
};