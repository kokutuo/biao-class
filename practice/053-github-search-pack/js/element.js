/* UI元素相关 */

var search = require('./search');

/* 选中页面中要用到的要素 */
var form,
    input,
    amount,
    pagination_container,
    pagination,
    pagination_start,
    pagination_end,
    user_list;

function set_form() {
    return form = document.getElementById('search-form');
}

function get_form() { 
    return form;
}

function set_input() {
    return input = document.getElementById('search-input');
}

function get_input() {
    return input;
}

function set_amount() {
    return amount = document.getElementById('amount');
}

function get_amount() {
    return amount;
}

function set_pagination_container() {
    return pagination_container = document.getElementById('pagination-container');
}

function get_pagination_container() {
    return pagination_container;
}

function set_pagination() {
    return pagination = document.getElementById('pagination');
}

function get_pagination() {
    return pagination;
}

function get_pagination_start() {
    return pagination_start = document.getElementById('pagination-start');
}

function get_pagination_end() {
    return pagination_end = document.getElementById('pagination-end');
    
}

function set_user_list() {
    return user_list = document.getElementById('user-list');
}

function get_user_list() {
    return user_list;
}

set_form();
set_amount();
set_input();
set_pagination();
set_pagination_container();
set_user_list();

/*渲染用户列表
 * @param Array data 用于渲染的数据
 * */
function render_usr_list(data) {

    var html = '';

    data.forEach(function (user) {
        html = html + `
       <div class="user">
            <a class="avatar" target="_blank" href="${user.html_url}">
            <img src="${user.avatar_url}">
            </a>
            <div class="info">
                <div class="username">${user.login}</div>
               <div><a target="_blank" href="${user.html_url}">${user.html_url}</a></div>
            </div>
        </div>
       `;
    });

    user_list.innerHTML = html;
}

function render_amount(data) {
    amount.innerHTML = `找到${data.total_count}条搜索结果`;
}

module.exports = {
    get_form: get_form,
    get_input: get_input,
    get_pagination: get_pagination,
    get_pagination_start: get_pagination_start,
    get_pagination_end: get_pagination_end,
    get_pagination_container: get_pagination_container,
    render_usr_list: render_usr_list,
    render_amount: render_amount
};