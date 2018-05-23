window.CatUi = CatUi;

function CatUi() {
    this.list = document.querySelector('#cat-list');
    this.form = document.querySelector('#cat-form');
    this.addCat = document.querySelector('#add-cat');
    this._api = new CatApi();
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;
CatUi.prototype.showForm = showForm;
CatUi.prototype.hideForm = hideForm;
CatUi.prototype.detectAddClick = detectAddClick;
CatUi.prototype.detectFormSubmit = detectFormSubmit;
CatUi.prototype.detectFormClick = detectFormClick;
CatUi.prototype.detectListClick = detectListClick;
CatUi.prototype.getFormData = helper.getFormData;
CatUi.prototype.getFormData = helper.getFormData;
CatUi.prototype.setFormData = helper.setFormData;
CatUi.prototype.clearForm = helper.clearForm;

function init() {
    this.detectAddClick();
    this.detectFormSubmit();
    this.detectFormClick();
    this.detectListClick();
    this.render();
}

/* 渲染列表 */
function render() {
    /* 每次渲染前 清空 */
    this.list.innerHTML = '';
    /* 获取数据列表 用于渲染 */
    var cat_list = this._api.read();
    var me = this;
    /* 循环数据，生成 HTML 结构 */
    cat_list.forEach(function (row) {
        var el = document.createElement('div'); /* 创造容器 */
        el.classList.add('cat-item', 'row'); /* 给容器加类，以便选择、添加样式 */
        el.dataset.id = row.id; /* 设置ID */

        el.innerHTML = `
        <div class="input">
        <input type="text" value="${row.title}" disabled>
        </div>
        <div class="tool-set">
            <span class="update">更新</span>
            <span class="delete">删除</span>
        </div>
        `;

        me.list.appendChild(el);
    });
}

function detectListClick() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target;        
        var id = target.closest('.cat-item').dataset.id;
        var isDelete = target.classList.contains('delete');
        if (isDelete) {
            me._api.$remove(id);
            me.render();    
        }
    });
}

/* 给 + 添加点击事件
 * 当它被点击时显示 form 表单
 */
function detectAddClick() {
    var me = this;
    this.addCat.addEventListener('click', function () {
        me.showForm();
    });
}

/* 表单提交事件 */
function detectFormSubmit() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var row = me.getFormData(me.form);
        me._api.$add(row);
        me.render();
        me.clearForm(me.form);
    });
}

/* 表单点击事件 */
function detectFormClick() {
    var me = this;
    this.form.addEventListener('click', function (e) {
       var target = e.target;
       var isCancel = target.dataset.action == 'cancel';
        if (isCancel) {
            me.hideForm();
        }
    });
}

/* 显示 form */
function showForm() {
    this.form.hidden = false;
}

/* 隐藏 form */
function hideForm() {
    this.form.hidden = true;
}