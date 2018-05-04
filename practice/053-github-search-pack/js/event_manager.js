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

function detect_next_page() {
    el.next.addEventListener('click', function () {
        /* 准备配置 */
        var config = {
            page: ++page,
            per_page: limit
        };

        search.user(keyword, function (data) {
            el.render_usr_list(data);
        }, config);
    });
}


/* 批量添加所有事件 */
function add_events() {
    detect_submit();
    detect_next_page();
}

module.exports = {
    detect_submit: detect_submit,
    detect_next_page: detect_next_page,
    add_events: add_events
};