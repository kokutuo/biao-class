var config,
    page_amount, //通过计算获取总页数
    el, // 插件插入的根元素
    def_config = { // 默认配置项
        amount: null,
        limit: null,
        range: 5,
        current: 1
    },
    el_pagination_list; // 页码插入的元素


/* 入口函数
 *@param object user_config 配置项 
 *{
 *    -------- 属性 ---------
 *    el: 选择器 / 必填项
 *    amount: 总数据量 / 必填项
 *    limit: 每页显示数 / 必填项
 *    range: 显示页码数 / 默认为5
 *    current_page: 当前页面 / 默认为1
 *    -------- 方法 ---------
 *    on_page_change() // 当页面发生改变时触发用户的函数 
 *}
 */
function init(user_config) {
    /* 选中插入的元素 */
    el = document.querySelector(user_config.el);

    /* 合并配置项 */
    config = Object.assign({}, def_config, user_config);

    /* 计算总页数 */
    calc_page_amount();

    change_page(config.current);

    /* 对组件进行初始化渲染 */
    init_render();

    /* 渲染组件 */
    render();
}

/* 渲染插件的基本HTML结构 */
function init_render() {
    el.innerHTML = `
      <fieldset class="pagination-fieldset">
        <div class="pagination-pre">
          <button class="pagination-first">First</button>
          <button class="pagination-prev">Prev</button>
        </div>
        <div class="pagination-list"></div>
        <div class="pagination-post">
          <button class="pagination-next">Next</button>
          <button class="pagination-last">Last</button>
        </div>
      </fieldset>
    `;

    el_pagination_list = el.querySelector('.pagination-list');

    /* 在页码组件的上一级绑定事件，来监听页码组件的冒泡 */
    el.addEventListener('click', function (e) {
        var target = e.target; // 冒泡事件的起点
        var is_btn_page = target.classList.contains('pagination-item'), // 点击的是页码按钮吗？
            is_first = target.classList.contains('pagination-first'), // 点击的是"首页"按钮吗？
            is_last = target.classList.contains('pagination-last'), // 点击的是"尾页"按钮吗？
            is_pre = target.classList.contains('pagination-pre'), // 点击的是"上一页"按钮吗？
            is_next = target.classList.contains('pagination-next'); // 点击的是"下一页"按钮吗？

        if (is_btn_page) { // 如果是数字按钮
            var page = parseInt(target.dataset.page);
            change_page(page);
        } else if (is_first) {
            change_page(1);
        } else if (is_last) {
            change_page(page_amount);
        } else if (is_pre) {
            change_page(config.current - 1);
        } else if (is_next) {
            change_page(config.current + 1);
        }

        render();
    });
}

/* 渲染页码组件 */
function render() {
    /* 每次渲染先清空 */
    el_pagination_list.innerHTML = '';


    var scope = decide_page_scope();
    var start = scope.start,
        end = scope.end;

    /* 循环生成页码按钮并插入组件 */
    for (var i = start; i <= end; i++) {
        var num = i;
        var btn = document.createElement('button');
        btn.innerText = num;
        btn.classList.add('pagination-item');
        if (num == config.current) {
            btn.classList.add('active');
        }
        el_pagination_list.appendChild(btn);
    }
}

/* 判断页码的开始和结束范围 */
function decide_page_scope() {
    var start,
        end,
        middle = Math.ceil(config.range / 2);

    /* 判断条件 */
    var reaching_left = config.current <= middle, // 靠近左边
        reaching_right = config.current > page_amount - middle; // 靠近右边

    if (reaching_left) {
        start = 1;
        end = config.range;
    } else if (reaching_right) {
        start = page_amount - config.range + 1;
        end = page_amount;
    } else {
        start = config.current - middle + 1;
        end = config.current + middle - 1;
    }

    if (start < 1) {
        start = 1;
    }

    if (end > page_amount) {
        end = page_amount;
    }

    return {
        start: start,
        end: end
    };
}

/* 验证并更改当前页数 
 * 更改后通知用户（将更改后的页数传给回调函数）
 * @param Number page 当前页
 */
function change_page(page) {
    if (config.current < 1) {
        config.current = 1;
    } else if (config.current > page_amount) {
        config.current = page_amount;
    } else {
        config.current = page;
    }

    /* 通知使用者 */
    if (config.on_change_page) {
        config.on_change_page = page;
    }
}

/* 计算总页数 */
function calc_page_amount() {
    page_amount = Math.ceil(config.amount / config.limit);
}

module.exports = {
    init: init,
    change_page: change_page
};