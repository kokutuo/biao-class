var variable = require('./variable'),
    list = require('./user_list'),
    history = require('./plugin/history/history');
    search = require('./search');

var output = {
    addEvent: addEvent
};

/* 添加所有事件 */
function addEvent() {
    detectSubmit();
}

/* 绑定提交事件 */
function detectSubmit() {
    variable.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var keyword = variable.setKeyword(variable.input.value);

        search.search(onSearchSucceed);
    });
}

/* 搜索成功时执行 */
function onSearchSucceed(data) {
    /* 用户数组设置 */
    list.resetUserList();
    variable.setList(data.items);

    /* 渲染用户列表 */
    list.render();
}



module.exports = output;