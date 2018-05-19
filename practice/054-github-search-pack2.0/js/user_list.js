var variable = require('./variable');

var output = {
    render: render,
    resetUserList: resetUserList
};

/* 渲染用户列表 */
function render() {
    var html = '';

    /* 获取用户列表数组 */
    var list = variable.getList();
    
    variable.showUserList();

    /* 循环渲染列表html结构 */
    list.forEach(function (user) {
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

    /* 将渲染好的HTML插入正确的位置 */
    variable.userList.innerHTML = html;
}

/* 清空列表内容 */
function  resetUserList() {
    variable.userList.innerHTML = '';
}

module.exports = output;