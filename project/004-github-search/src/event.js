var variable = require('./variable'),
    search = require('./search'),
    tool = require('./tool'),
    history = require('./plugin/history/history'),
    pagination = require('./plugin/pagination/pagination'),
    list = require('./user_list');

/* 绑定表单提交事件 */
function detect_submit() {
    variable.form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* 获取搜索关键词 */
        var keyword = variable.set_keyword(variable.input.value);
        
        /* 将关键词加入历史记录 */
        history.add(keyword);

        /* 搜索并渲染用户列表 */
        search.user(variable.get_keyword(), function (data) {
            list.render_user_list(data.items);
            list.render_sum_total(data.total_count);
            init_pagination(data.total_count);
        });
    });
}

/* 当输入框focus的时候显示历史记录 */
function show_history_list() {
    variable.input.addEventListener('focus', function () {
        history.show();
    });
}

/* 当搜索框和历史记录之外的地方被点击时，隐藏历史记录 */
function hidden_history_list() {
    document.addEventListener('click', function (e) {
       var el = e.target; 
       var tmp = el.closest('#history-list');
       
       if (!tmp && el != variable.input) {
           history.hidden();
       }
    });
}

/* 初始化history插件 */
function init_history() {
    history.init({
        el: '#history-list',
        on_click: function (keyword, e) {
            variable.input.value = keyword;
        }
    });
}

/* 初始化pagination插件 */
function init_pagination(data) {
    pagination.init({
        el: '#pagination',
       amount:  data,
       limit: variable.get_limit()
    });
}


function add_event() {
    detect_submit();
    tool.click_top();
    init_history();
    show_history_list();
    hidden_history_list();
}

module.exports = {
    add_event: add_event
};