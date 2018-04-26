var form = document.getElementById('search-form'),
    input = document.getElementById('search-input'),
    info = document.getElementById('info'),
    timer;

init();

function init() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var userName = input.value;

        if (!userName) {
            return;
        }

        search(userName);
    });

    input.addEventListener('keyup', function (e) {
        clearTimeout(timer);

        var userName = input.value;

        if (!userName) {
            return;
        }

        timer = setTimeout(function () {
            search(userName);
        }, 500);
    });

}

function search(name) {
    send('http://api.github.com/users/' + name,
        function (data) {
            console.log(data);
            render(data);
        },
        function () {
            render();
        });
}

function send(url, fn_success, fn_faild, method) {
    method = method || 'get';
    var http = new XMLHttpRequest();
    http.open(method, url);
    http.send();

    http.addEventListener('load', function name() {
        var data = JSON.parse(this.responseText);
        if (this.status == 200) {
            if (fn_success) {
                fn_success(data);
            }
        } else {
            if (fn_faild) {
                fn_faild();
            }
        }
    });
}

function render(data) {
    if (!data) {
        info.innerHTML = `<div>暂无此用户</div>`;
        return;
    }
    info.innerHTML = `
    <div class="item">
        <span class="title">用户：</span>
        <span class="value">${data.login}</span>
    </div>
    <div class="item">
        <span class="title">签名：</span>
        <span class="value">${data.bio || '无'}</span>
    </div>
    <div class="item">
        <span class="title">头像：</span>
        <span class="value"><img src=${data.avatar_url}></span>
    </div>
    `;
}