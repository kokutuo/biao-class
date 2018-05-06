var el = require('./element'),
    send = require('./send'),
    search = require('./search'),
    event_manager = require('./event_manager'),
    current_page = 1,
    amount_page,
    limit = 10,
    max_btn_page = 5;

function set_current_page(val) {
    return current_page = val;
}

function get_current_page() {
    return current_page;
}

function set_limit(val) {
    return limit = val;
}

function get_limit() {
    return limit;
}

function get_amount_page() {
    console.log(send.get_amount(), get_limit());
    
    return amount_page = Math.ceil(send.get_amount() / get_limit());
}

function set_max_btn_page(val) {
    return max_btn_page = val;
}

function get_max_btn_page() {
    return max_btn_page;
}

function render_pagination() {
    show_pagination();
    clear_pagination();
    get_current_page();
    get_max_btn_page();
    get_amount_page();

    console.log(amount_page);

    var start,
        middle = Math.ceil(max_btn_page / 2),
        end;

    var reaching_left = current_page < middle;
    reaching_right = current_page > amount_page - middle;

    if (reaching_left) {
        start = 1;
        end = max_btn_page;
    } else if (reaching_right) {
        start = amount_page - max_btn_page + 1;
        end = amount_page;
    } else {
        start = current_page - middle + 1;
        end = current_page + middle - 1;
    }

    if (start < 1) {
        start = 1;
    }

    if (end > amount_page) {
        end = amount_page;
    }

    for (var i = start; i <= end; i++) {
        var num = i;
        var btn = document.createElement('button');
        btn.classList.add('pager');
        btn.innerText = num;
        el.get_pagination().appendChild(btn);

        /* 给每一个button绑定事件 */
        btn.addEventListener('click', click_btn(num));
    }
}

function click_btn(page) {
    return function () {
        set_current_page(page);

        /* @1 这里使用暴露出来的 event_manager.get_keywork() 方法无法得到 keyword，why? */
        console.log('这里使用暴露出来的 event_manager.get_keywork() 方法无法得到 keyword，why?');
        search.user(el.get_input().value, function (data) {
            el.render_usr_list(data.items);
            render_pagination();
        }, {
            current_page: current_page,
            limit: limit
        });
    };
}

function show_pagination() {
    el.get_pagination_container().hidden = false;
}

function clear_pagination() {
    el.get_pagination().innerHTML = '';
}

module.exports = {
    render_pagination: render_pagination
};