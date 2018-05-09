var store = require('../util/store'),
    helper = require('../util/helper');

var list = [],
    el,
    on_click,
    on_delete;

function init(config) {
    el = document.querySelector('config.el');
    on_click = config.on_click;
    on_delete = config.on_delete;

    if (!el || !config.el) {
        throw 'Invalid root elment';
    }
    sync_to_ladle(); // 取得最新的数据
    render();
}

function render() {
    el.innerHTML = '';

    list.forEach(function (keyword) {
        var el_histoty = document.createElement('div');
        el_histoty.innerHTML = `
        <div class="text">${keyword}</div>
        <div class="tool">
          <span class="delete">删除</span>
        </div>
       `;
       el_histoty.classList.add('history');
       el.appendChild(el_histoty);

        el_histoty.addEventListener('click', function (e) {
            if (on_click) {
                on_click(keyword, e);
            }
        });

        el_histoty.querySelector('.delete').addEventListener('click', function (e) {
            e.stopPropagation();
           if (on_delete) {
               on_delete(keyword, e);
           }

           remove(keyword);
        });
    });
}

/* ============================================== */

/* 将数据放入存储器 */
function sync_to_store() {
    store.set('history_list', list);
}

/* 从存储器中取得数据 */
function sync_to_ladle() {
    list = store.get('history_list') || [];
}

/* 将关键词推入list数组中 并渲染 */
function add(keyword) {
    /* 不管有没有先删除一遍 */
    helper.find_and_delete(list, keyword);
    /* 推入 */
    list.unshift(keyword);
    /* 存储 */
    sync_to_store();
    /* 渲染 */
    render();
}

/* 删除一条历史记录 */
function remove(keyword) {
    helper.find_and_delete(list, keyword);
    sync_to_store();
    render();
}

/* 清空历史记录 */
function clear() {
    list = [];
    sync_to_store();
    render();
}