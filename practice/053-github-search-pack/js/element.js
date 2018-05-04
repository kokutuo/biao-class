/* UI元素相关 */

/* 选中页面中要用到的要素 */
var form = document.getElementById('search-form'),
    input = document.getElementById('search-input'),
    next = document.getElementById('next'),
    user_list = document.getElementById('user-list');

/*渲染用户列表
 * @param Array data 用于渲染的数据
 * */
function render_usr_list(data) {
    html = '';

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

module.exports = {
    form: form,
    input: input,
    next: next,
    render_usr_list: render_usr_list
};