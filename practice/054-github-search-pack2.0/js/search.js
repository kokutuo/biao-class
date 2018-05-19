var send = require('./util/send'),
    variable = require('./variable');

var output = {
    search: search,
};

/* 将搜索框中的搜索词设置为val */
function setKeyword(val) {
    variable.input.value = val;
    variable.setKeyword(val);
}

function search(onSucceed, onFaild, before, after) {
    searchUser(onSucceed, onFaild, beforeSeach, afterSeach);
}

/* 搜索完成之前显示loading */
function beforeSeach() {
    variable.showLoading();
}

/* 搜索完成之后隐藏loading */
function afterSeach() {
    variable.hideLoading();
}


/* 用户搜索 */
function searchUser(onSucceed, onFaild, before, after) {
    /* 设置url */
    var url = 'https://api.github.com/search/users?q=' +
        variable.getKeyword() +
        '&page=' +
        variable.getCurrent() +
        '&per_page=' +
        variable.getLimit();

    /* 请求返回前执行 */
    if (before) {
        before();
    }

    /* 调用send模块的ajax方法，发送请求 */
    send.ajax({
        url: url,
        headers: {
            Authorization: btoa('kokutuo:3cde251583b6e4715f5cb02354c4b5c3a621f5d8')
        },
        onSucceed: function (data) {
            if (onSucceed) {
                onSucceed(data);
            }
        },
        onFaild: function () {
            if (onFaild) {
                onFaild();
            }
        },
        onLoad: function () {
            if (after) {
                after(); // 请求返回后执行
            }
        }
    });
}

module.exports = output;