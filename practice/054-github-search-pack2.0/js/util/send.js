var output = {
    get: get,
    post: post,
    ajax: ajax
};

function get(url, onSucceed, onFaild) {
    ajax({
        url: url,
        method: 'get',
        onSucceed: onSucceed,
        onFaild: onFaild
    });
}

function post(url, data, onSucceed, onFaild) {
    ajax({
        url: url,
        method: 'post',
        data: data,
        onSucceed: onSucceed,
        onFaild: onFaild,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    });
}

/* 参数设置 
 * config = {
 * ---------- 属性 ----------
 *  url: String / 请求的目标地址，必填项
 *  headers: Object / 发送头，选填
 *  method: String / 发送法师，选填，若不填则为'get'
 * 
 *  --------- 方法 ----------
 *  onSucceed: Function / 请求成功时执行
 *  onFaild: Function / 请求失败时执行
 *  onLoad: Function / 失败与否都会执行
 * }
 */
function ajax(config) {
    if (!config.url) {
        throw 'Invalid URL';
    }

    var http = new XMLHttpRequest(),
        headers = config.headers,
        data;

    http.open(config.method || 'get', config.url);

    if (headers) {
        for (var key in headers) {
            http.setRequestHeader(key, headers[key]);
        }
    }

    http.send(JSON.stringify(config.data));

    http.addEventListener('load', function () {
        if (http.status > 200) { //失败
            if (config.onFaild) {
                config.onFaild(data, http);
            }
        } else { // 成功
            if (config.onSucceed) {
                data = JSON.parse(http.responseText);
                config.onSucceed(data, http);
            }
        }
    });

    if (config.onLoad) {
        config.onLoad();
    }
}

module.exports = output;