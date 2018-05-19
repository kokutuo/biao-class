var store = require('../../util/store'),
    helper = require('../../util/helper');

var list = [], // 存放历史记录
    el, // 根元素
    onClick, // 点击历史记录触发的函数
    onDelete; // 点击删除触发的函数

/* 配置项 
 * config = {
 *  el: 
 * }
 */
function init(config) {
    el = document.querySelector(config.el);
    onClick = config.onClick;
    onDelete = config.onDelete;

    syncToladle();
    render();
}

/* ============= UI ============== */
function render() {
    el.innerHTML = '';

    list.forEach(function (keyword) {
        var elHistory = document.createElement('div');
        elHistory.innerHTML = `
        <div class="text">${keyword}</div>
        <div class="tool">
          <span class="delete">删除</span>
        </div>
        `;

        elHistory.classList.add('history');
        el.appendChild(elHistory);

        elHistory.addEventListener('click', function (keyword, e) {
           if(onClick){
               onClick(keyword, e);
           } 
        });

        elHistory.querySelector('.delete').addEventListener('click', function (keyword, e) {
           e.stopPropagation(); 
           if (onDelete) {
               onDelete(keyword,e);
           }
        });
    });

}


/* ========== 数据处理 =========== */

/* 将数据从炒瓢放到冰箱里 */
function syncToStore() {
    store.set('history', list);
}

/* 将数据从冰箱取到炒瓢里 */
function syncToladle() {
    list = store.get('history') || [];
}

/* 添加数据 */
function add(keyword) {
    helper.findAndDelete(list, keyword);
    list.unshift(keyword);

    syncToStore();
    render();
}

/* 删除数据 */
function remove(keyword) {
    helper.findAndDelete(list, keyword);

    syncToStore();
    render();
}

function show() {
    el.hidden = false;
}

function hide() {
    el.hidden = true;
}

module.exports = {
    render: render,
    add: add,
    remove: remove,
    show: show,
    hide: hide
};