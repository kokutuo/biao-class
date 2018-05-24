window.TaskUi = TaskUi;

test_list = [{
        id: 100,
        title: '搓炉石',
        completed: false,
        cat_id: 1
    },
    {
        id: 101,
        title: '崩崩崩',
        completed: false,
        cat_id: 1
    },
    {
        id: 102,
        title: '买菜',
        completed: false,
        cat_id: 2,
    },
    {
        id: 103,
        title: '洗菜',
        completed: false,
        cat_id: 2,
    },
    {
        id: 104,
        title: '背单词',
        completed: false,
        cat_id: 3,
    },
    {
        id: 105,
        title: '写作文',
        completed: false,
        cat_id: 3
    }
];

function TaskUi(formSelector, listSelector, inputSelector) {
    this.form = document.querySelector(formSelector);
    this.list = document.querySelector(listSelector);
    this.input = document.querySelector(inputSelector);
    /* 私有属性，不应该直接调用 */
    this._api = new TaskApi(test_list);
}

TaskUi.prototype.getFormData = helper.getFormData;
TaskUi.prototype.setFormData = helper.setFormData;
TaskUi.prototype.clearForm = helper.clearForm;
TaskUi.prototype.render = render;
TaskUi.prototype.init = init;
TaskUi.prototype.detectAdd = detectAdd;
TaskUi.prototype.detectClickList = detectClickList;
TaskUi.prototype.remove = remove;

function init() {
    this.render();
    this.detectClickList();
    this.detectAdd();
}

function detectClickList() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target;
        var todoItem = target.closest('.todo-item'),
            id = todoItem.dataset.id;

        var isRemove = target.classList.contains('remove'),
            isModify = target.classList.contains('modify');

        if (isRemove) {
            me.remove(id);
        }

        if (isModify) {
            var row = me._api.read(id);
            me.setFormData(me.form, row);
        }
    });
}

function remove(id) {
    this._api.remove(id);
    this.render();
}

/* 监听添加事件（表单提交事件） */
function detectAdd() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        /* 获取输入框的值 */
        var row = me.getFormData(me.form);

        if (row.id) {
            me._api.modify(row.id, row);
        } else {
            /* 更新数据 */
            me._api.add(row);
        }
        /* 更新界面 */
        me.render();
        /* 清空输入框的值 */
        me.input.value = '';
        /* 清空id */
        me.clearForm(me.form);
    });
}

/* 渲染任务列表 */
function render(cat_id) {
    /* 通过api拿到数据 */
    var todoList = cat_id ?
        this._api.filterById(cat_id) :
        this._api.read();
    
    /* 先清空 */
    if (todoList.length) {
        this.list.innerHTML = '';
    } else {
        this.list.innerHTML = `<div class='empty-holder'>暂无内容</div>`
    }
    var me = this;
    /* 遍历数据，插入列表 */
    todoList.forEach(function (item) {
        var el = document.createElement('div');
        el.classList.add('row', 'todo-item');
        el.dataset.id = item.id;

        el.innerHTML = `
        <div class="col checkbox">
            <input type="checkbox">
        </div>
        <div class="col detail">
            <div class="title">${item.title}</div>
        </div>
        <div class="col tool-set">
            <button class='modify'>更新</button>
            <button class='remove'>删除</button>
        </div>
        `;

        me.list.appendChild(el);
    });
}