window.Ui = Ui;

function Ui(formSelector, listSelector, inputSelector) {
    this.form = document.querySelector(formSelector);
    this.list = document.querySelector(listSelector);
    this.input = document.querySelector(inputSelector);
    this._api = new Api();
}

Ui.prototype.init = init;
Ui.prototype.render = render;
Ui.prototype.detectAdd = detectAdd;
Ui.prototype.getFormData = getFormData;
Ui.prototype.setFormData = setFormData;
Ui.prototype.detectClickList = detectClickList;
Ui.prototype.remove = remove;
Ui.prototype.clearForm = clearForm;

function init() {
    this.render();
    this.detectAdd();
    this.detectClickList();
}

/* 渲染用户列表 */
function render() {
    /* 获取列表数据 */
    var todoList = this._api.read();
    /* 清空列表 */
    this.list.innerHTML = '';
    var me = this;
    /* 循环数据，渲染HTML结构 */
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

/* 绑定表单提交事件 */
function detectAdd() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        /* 获取表单数据 */
        var row = me.getFormData(me.form);
        
        /* 没有ID, 则调add方法 */
        if (!row.id) {
            /* 添加 */
            me._api.add(row);
        }
        /* 有ID, 则调update方法 */
        me._api.updata(row.id, row);
        /* 渲染 */
        me.render();
        /* 添加完成后清空输入框 */
        me.input.value = '';
        /* 每次更新之后 都需要清空form 中的id */
        me.clearForm();
    });
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
        } else if (isModify) {
            var data = me._api.read(id);
            console.log(data);
            
            me.setFormData(me.form, data);
        }
    });
}

function remove(id) {
    this._api.remove(id);
    this.render();
}

function clearForm() {
    var id = this.form.querySelector('[name=id]');
    id.value = '';
}

/* 获取表单中的数据 */
function getFormData(form) {
    var data = {};
    var list = form.querySelectorAll('[name]');
    list.forEach(function (input) {
        switch (input.nodeName) {
            case 'INPUT':
                switch (input.type) {
                    case 'text':
                    case 'search':
                    case 'number':
                    case 'password':
                    case 'hidden':
                        data[input.name] = input.value;
                        break;
                    case 'checkbox':
                    case 'radio':
                        data[input.name] = input.checked;
                }
                break;
            case 'TEXTAREA':
                data[input.name] = input.value;
                break;
        }
    });

    return data;
}

/* 设置表单中的数据 */
function setFormData(form, data) {
    for (var key in data) {
        var value = data[key];
        var input = form.querySelector(`[name=${key}]`);
        var dataType = typeof value;
        if (!input) {
            continue;
        }
        switch (dataType) {
            case 'string':
            case 'number':
                input.value = value;
                break;
            case 'boolean':
                input.checked = value;
        }
    }
}