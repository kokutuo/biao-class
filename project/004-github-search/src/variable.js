/* 定义所有的变量，选中页面中的元素 */

var form = document.getElementById('search-form'),
    input = document.getElementById('search-input'),
    history_list = document.getElementById('history-list'),
    sum_total = document.getElementById('sum-total'),
    user_list = document.getElementById('user-list'),
    placeholer = document.getElementById('placeholer'),
    pagination_container = document.getElementById('pagination-container'),
    pagination = pagination_container.querySelector('#pagination'),
    pagination_start = pagination_container.querySelector('#pagination-start'),
    pagination_end = pagination_container.querySelector('#pagination-end'),
    top = document.getElementById('top');

var keyword,
    current_page = 1,
    limit = 8,
    MAX_LIMIT = 999;

function set_keyword(val) {
    return keyword = val;
}

function get_keyword() {
    return keyword;
}

function set_current_page(val) {
    return current_page = val;
}

function get_current_page() {
    return current_page;
}

function set_limit(val) {
    return limit = val;
}

function get_limit() {
    return limit;
}

module.exports = {
    form: form,
    input: input,
    history_list: history_list,
    sum_total: sum_total,
    user_list: user_list,
    placeholer: placeholer,
    pagination_container: pagination_container,
    pagination: pagination,
    pagination_start: pagination_start,
    pagination_end: pagination_end,
    top: top,
    set_keyword: set_keyword,
    get_keyword: get_keyword,
    set_current_page: set_current_page,
    get_current_page: get_current_page,
    set_limit: set_limit,
    get_limit: get_limit,
    MAX_LIMIT: MAX_LIMIT
};