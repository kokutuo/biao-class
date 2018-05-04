/* 事件处理相关 */

var el = require('./element'),
    search = require('./search'),
    page = 1,
    limit = 10,
    keyword;

/* 监听表单提交事件 */
function detect_submit() {
    el.form.addEventListener('submit', function (e) {
        e.preventDefault();

        /* 获取搜索关键词 */
        keyword = el.input.value;

        /* 开始搜索 */
        search.user(keyword, function (data) {
            el.render_usr_list(data);
        });

    });
}


/* 批量添加所有事件 */
function add_events() {
    detect_submit();
}

module.exports = {
    detect_submit: detect_submit,
    add_events: add_events
};