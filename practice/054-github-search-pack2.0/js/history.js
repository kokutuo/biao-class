var variable = require('./variable'),
    store = require('./store');

var history_list = [];

/*将关键词写入历史记录*/
function append_history(kwd) {
    /*不管有没有已经搜过的先删一遍再说*/
    find_and_delete(history_list, kwd);
    /*更新炒瓢数据*/
    history_list.unshift(kwd);
    /*更新冰箱数据*/
    overwrite_history_list(history_list);
}

/*从冰箱中重新获取搜索历史记录*/
function reload_history_list() {
    history_list = store.get('history_list') || [];
}

function overwrite_history_list(data) {
    store.set('history_list', data);
}

/*渲染历史记录*/
function render_history_list() {
    variable.history_list.innerHTML = '';
    history_list.forEach(function (history) {
        var el_delete, el_history = document.createElement('div');

        el_history.classList.add('history');
        el_history.dataset.history = history;
        el_history.innerHTML =`
        <div class="text">${history}</div>
        <div class="tool">
          <span class="delete">删除</span>
        </div>
        `;
        el_delete = el_history.querySelector('.delete');
        el_history_list.appendChild(el_history);

        /*当本条历史记录被点击时将搜索框的关键词改为对应的历史关键词*/
        el_history.addEventListener('click', function (e) {
            /*如果点的是里面的删除按钮，就直接返回，既不上屏，又不搜索*/
            if (e.target.classList.contains('delete'))
                return;

            /*上屏*/
            set_keyword(this.dataset.history);
            /*搜搜*/
            search();
        });

        /*当删除按钮点击时*/
        el_delete.addEventListener('click', function () {
            /*先找到叫.history的先人，因为它那里存着对应的关键词*/
            var el_history = this.closest('.history'),
                kwd = el_history.dataset.history;

            /*如果删除失败，直接返回*/
            if (!find_and_delete(history_list, kwd))
                return;

            /*否则用新数据覆盖冰箱里的数据*/
            overwrite_history_list(history_list);
            /*重新渲染历史记录*/
            setTimeout(function () {
                render_history_list();
            }, 0);

            /*如果没有历史记录了就隐藏整个记录列表*/
            if (!history_list.length) {
                el_history_list.hidden = true;
            }
        });
    });
}

function find_and_delete(arr, element) {
    var shit_index = arr.indexOf(element);

    if (shit_index == -1)
        return false;

    arr.splice(shit_index, 1);
    return true;
}

function show_history_list() {
    if (!history_list.length)
        return;

    el_history_list.hidden = false;
}

function hide_history_list() {
    el_history_list.hidden = true;
}