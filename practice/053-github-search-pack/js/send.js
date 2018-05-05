var amount;

function send(url, on_success, method) {
    method = method || 'get'
    var http = new XMLHttpRequest();
    http.open(method, url);
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
    get_amount: get_amount,
    send: send
};