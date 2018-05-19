var form = document.getElementById('search-form'),
    input = document.getElementById('search-input'),
    total = document.getElementById('total'),
    userList = document.getElementById('user-list'),
    placeholer = document.getElementById('placeholer'),
    top = document.getElementById('top'),
    loading = document.getElementById('loading');


var list = [], // 用于存储返回数据中的用户列表
    current = 1, // 当前页，默认为1
    limit = 10, // 每页显示用户条数，默认为10
    keyword;

function setList(val) {
    list = val;
    return list;
}

function getList() {
    return list;
}

function setKeyword(val) {
    keyword = val;
    return keyword;
}

function getKeyword() {
    return keyword;
}

function setCurrent(val) {
    current = val;
    return current;
}

function getCurrent() {
    return current;
}

function setLimit(val) {
    limit = val;
    return limit;
}

function getLimit() {
    return limit;
}

function showUserList() {
    userList.hidden = false;
}

function hideUserList() {
    userList.hidden = true;
}

function showLoading() {
    console.log(loading);
    loading.hidden = false;
}

function hideLoading() {
    loading.hidden = true;
}

module.exports = {
    form: form,
    input: input,
    total: total,
    userList: userList,
    placeholer: placeholer,
    top: top,
    loading: loading,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showUserList: showUserList,
    hideUserList: hideUserList,
    setList: setList,
    getList: getList,
    setKeyword: setKeyword,
    getKeyword: getKeyword,
    setCurrent: setCurrent,
    getCurrent: getCurrent,
    setLimit: setLimit,
    getLimit: getLimit

}