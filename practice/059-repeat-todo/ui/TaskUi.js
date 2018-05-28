window.TaskUi = TaskUi;

var testList = [{
        id: 100,
        title: '买菜',
        completed: false,

    },
    {
        id: 101,
        title: '洗菜',
        completed: false
    },
    {
        id: 102,
        title: '码字',
        completed: false
    },
    {
        id: 103,
        title: 'hello world',
        completed: false
    }
];

function TaskUi(config) {
    var defConfig = {
        formSelector: '#todo-form',
        listSelector: '#todo-list',
        inputSelector: '#todo-input'
    };

    var c = this.config = Object.assign({}, defConfig, config);

    this.form = document.querySelector(c.formSelector);
    this.list = document.querySelector(c.listSelector);
    this.input = document.querySelector(c.inputSelector);

    this._api = new TaskApi(testList);
}

TaskUi.prototype.init = init;
TaskUi.prototype.render = render;
TaskUi.prototype.detectSubmit = detectSubmit;
TaskUi.prototype.detectDeleteCLick = detectDeleteCLick;


TaskUi.prototype.getFormData = helper.getFormData;
TaskUi.prototype.setFormData = helper.setFormData;
TaskUi.prototype.setFormData = helper.setFormData;
TaskUi.prototype.clearFormData = helper.clearFormData;

/* 初始化 */
function init() {
    this.render();
    this.detectSubmit();
    this.detectDeleteCLick();
}

/* 渲染 */
function render() {
    /* 先清空 */
    this.list.innerHTML = '';
    /* 获取列表数组 */
    var todoList = this._api.read();
    var me = this;
    /* 循环数组生成HTML结构 */
    todoList.forEach(function (row) {
        var el = document.createElement('div');
        el.classList.add('row', 'todo-item');
        el.dataset.id = row.id;

        el.innerHTML = `
        <div class="col checkbox">
            <input type="checkbox">
        </div>
         <div class="col detail">
            <div class="title">${row.title}</div>
        </div>
        <div class="col tool-set">
            <button class="update">更新</button>
            <button class="remove">删除</button>
        </div>
        `;

        me.list.appendChild(el);
    });
}

/* 表单提交 */
function detectSubmit() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var row = me.getFormData(me.form);
        if (!row.id) { // 没有id则是添加
            me._api.add(row);
        } else { // 有id 则是更新
            me._api.update(row.id, row);
        }
        me.clearFormData(me.form); // 清空表单数据
        me.render();
    });
}

/* 表单点击 -- 删除/更新 */
function detectDeleteCLick() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target;
        var todoItem = target.closest('.todo-item'); // 获取点击的父级(id在那里)
        var id = todoItem.dataset.id; // 获取id
        var isRemoveBtn = target.classList.contains('remove'), // 点击的是删除么
            isUpdateBtn = target.classList.contains('update'); // 点击的是更新么
        if (isRemoveBtn) {
            me._api.remove(id);
            me.render();
        }
        if (isUpdateBtn) { // 点击更新只获取并设置数据, 然后交给submit处理
            var data = me._api.read(id);
            me.setFormData(me.form, data);
        }
    });
}