var variable = require('./variable'),
    list = require('./user_list'),
    send = require('./send'),
    search = require('./search');

function render_pagination(max_btn_page) {
    max_btn_page = max_btn_page || 5;

    show_pagination();
    clear_pagination();
    
    var amount_page = get_amount_page();


    var current_page = variable.get_current_page();

    var start,
        middle = Math.ceil(max_btn_page / 2),
        end;

    var reaching_left = current_page <= middle,
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
        variable.pagination.appendChild(btn);

        if (current_page == num) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', click_btn(num));
    }
}

function click_btn(page) {
    return function () {
        var current_page = variable.set_current_page(page);
        search.user(variable.get_keyword(), function (data) {
            list.render_user_list(data.items);
            render_pagination();
        }, {
            current_page: current_page
        });
    };
}

function detect_click_pagination() {
    // @1
    var amount_page = get_amount_page();

    

    variable.pagination_start.addEventListener('click', function () {
        goto_page(1);
    });
    variable.pagination_end.addEventListener('click', function () {
        goto_page(amount_page);
    });
}

function goto_page(page) {
    var limit = variable.get_limit();
    var max_user_limit_reached = page * limit > variable.MAX_LIMIT;

    if (max_user_limit_reached) {
        variable.set_current_page(Math.floor(variable.MAX_LIMIT / limit));
    } else {
        variable.set_current_page(page);
    }

    search.user(variable.get_keyword(), function (data) {
        list.render_user_list(data.items);
        render_pagination();
    }, {
        current_page: variable.get_current_page()
    });
}

function show_pagination() {
    variable.pagination_container.hidden = false;
}

function clear_pagination() {
    variable.pagination.innerHTML = '';
}

function get_amount_page() {
    var amount_page = Math.ceil(send.get_amount() / variable.get_limit());
    return amount_page;
}

module.exports = {
    render_pagination: render_pagination,
    detect_click_pagination: detect_click_pagination
};