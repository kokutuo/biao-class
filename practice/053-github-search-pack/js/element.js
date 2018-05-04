/* UI元素相关 */

var search = require('./search');

/* 选中页面中要用到的要素 */
var form = document.getElementById('search-form'),
    input = document.getElementById('search-input'),
    amount = document.getElementById('amount'),
    pagination_cotainer = document.getElementById('pagination-container'),
    pagination = pagination_cotainer.querySelector('#pagination'),
    user_list = document.getElementById('user-list');

console.log(search.amount);

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
    amount.innerHTML = `找到${search.amount}条搜索结果`;
}

module.exports = {
    form: form,
    input: input,
    pagination: pagination,
    pagination_cotainer: pagination_cotainer,
    render_usr_list: render_usr_list
};