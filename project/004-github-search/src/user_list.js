var variable = require('./variable');

function render_user_list(data) {
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

    variable.user_list.innerHTML = html;
}

function render_sum_total(data) {
    variable.sum_total.hidden = false;

    variable.sum_total.innerHTML = `为您找到${data}条搜索结果`;
}

module.exports = {
    render_user_list: render_user_list,
    render_sum_total: render_sum_total
};