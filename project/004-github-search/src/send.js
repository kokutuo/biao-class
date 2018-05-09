var variable = require('./variable');

function send(url, on_success, method) {
    method = method || 'get';

    var http = new XMLHttpRequest();
    http.open(method, url);
    http.setRequestHeader('Authorization', 'Basic' + btoa('kokutuo:3cde251583b6e4715f5cb02354c4b5c3a621f5d8'));
    http.send();

    http.addEventListener('load', function () {
        var res = JSON.parse(this.responseText);
        variable.set_amount(res.total_count);
        
        on_success(res);
    });
}

module.exports = {
    send: send
};