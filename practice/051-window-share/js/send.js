;
(function () {
    'use strict';

    var res;

    window.send = {
        get: get,
        post: post,
        send: send
    };

    function get(url, on_success) {
        send(url, 'get', on_success);
    }

    function post(url, on_success) {
        send(url, 'post', on_success);
    }

    function send(url, method, on_success) {
        var http = new XMLHttpRequest();
        http.open(method, url);
        http.send();

        http.addEventListener('load', function () {
            res = JSON.parse(this.responseText);
            if (on_success) {
                on_success(res);
            }
        });
    }
})();