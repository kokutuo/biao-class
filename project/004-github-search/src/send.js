var variable = require('./variable');

var amount; //总数据数

function send(url, on_success, method) {
    method = method || 'get';

    var http = new XMLHttpRequest();
    http.open(method, url);
    http.setRequestHeader('Authorization', 'Basic' + btoa('kokutuo:3cde251583b6e4715f5cb02354c4b5c3a621f5d8'));
    http.send();

    http.addEventListener('load', function () {
        var res = JSON.parse(this.responseText);
        amount = res.total_count;

        on_success(res);
    });
}

function get_amount() {
    return amount;
}

module.exports = {
    send: send,
    get_amount: get_amount
};