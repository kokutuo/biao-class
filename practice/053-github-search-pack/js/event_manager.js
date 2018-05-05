/* 事件处理相关 */

var el = require('./element'),
    search = require('./search'),
    pagination = require('./pagination'),
    keyword;


function set_keyword(val) {
    return keyword = val;
}

function get_keyword() {
    return keyword;
}

/* 监听表单提交事件 */
function detect_submit() {
    el.get_form().addEventListener('submit', function (e) {
        e.preventDefault();

        /* 获取搜索关键词 */
        keyword = el.get_input().value;

        if (!keyword) {
            alert('药，药，切克闹~');
            return;
        }

        /* 开始搜索 */
        search.user(keyword, function (data) {
            el.render_usr_list(data.items);
            el.render_amount(data);
            pagination.render_pagination();
        });
    });
}

/* 批量添加所有事件 */
function add_events() {
    detect_submit();
}

module.exports = {
    set_keyword: set_keyword,
    get_keyword: get_keyword,
    detect_submit: detect_submit,
    add_events: add_events
};