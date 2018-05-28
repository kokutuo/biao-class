window.CatUi = CatUi;

function CatUi(config) {
    var defConfig = {
        catListSelector: '#cat-list',
        catFormSelector: '#cat-form',
        addCatSelector: '#add-cat',
        onItemClick: null,
        onDeleteClick: null
    };

    var c = this.config = Object.assign({}, defConfig, config);

    this.list = document.querySelector(c.catListSelector);
    this.form = document.querySelector(c.catFormSelector);
    this.addCat = document.querySelector(c.addCatSelector);
    this._api = new CatApi();
    this.updatingCatItem = null;
}

CatUi.prototype = {
    init: init,
    render: render,
    detectAddClick: detectAddClick,
    detectFormSubmit: detectFormSubmit,
    detectFormClick: detectFormClick,
    detectListClick: detectListClick,
    resetFormLocation: resetFormLocation,
    showForm: showForm,
    hideForm: hideForm,
    showAdd: showAdd,
    hideAdd: hideAdd,
    showUpdatingCatItem: showUpdatingCatItem,
    getFormData: helper.getFormData,
    setFormData: helper.setFormData,
    clearForm: helper.clearForm,
    setActiveCatItem: setActiveCatItem
};

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
        <input class='content' type="text" value="${row.title}" disabled>
        </div>
        <div class="tool-set">
        ${row.id == 1 ?
            '' :
            `<span class="update">更新</span>
            <span class="delete">删除</span>`
        }
        </div>
        `;

        me.list.appendChild(el);
    });
}

/* 绑定列表点击事件 */
function detectListClick() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target;
        var catItem = target.closest('.cat-item');
        var isDelete = target.classList.contains('delete'), // 点击的是删除按钮吗
            isUpdate = target.classList.contains('update'); // 点击的是更新按钮吗

        /* 如果有类为 .cat-item 的父级 则获取其ID */
        if (catItem) {
            id = parseInt(catItem.dataset.id);
        }
        if (isDelete) {
            /* 点击删除，调用 remove 方法，再渲染 */
            me._api.remove(id);
            if (me.config.onDeleteClick) {
                me.config.onDeleteClick(id);
            }

            me.showAdd();
            me.render();
        } else if (isUpdate) {
            /* 点击更新，获取数据并传给表单，让表单处理 */

            me.showUpdatingCatItem(); // 如果存在正在更新的项，则先显示它，再去更新另一条
            me.showForm();
            var row = me._api.read(id);
            me.setFormData(me.form, row);
            catItem.hidden = true; // 隐藏它，给 form 留坑
            catItem.insertAdjacentElement('afterend', me.form); // 将 form 表单插入它应该在的位置
            me.updatingCatItem = catItem; // 缓存更新项
        } else {
            if (!id) {
                return;
            }
            me.setActiveCatItem(id);
            if (me.config.onItemClick) {
                me.config.onItemClick(id);
            }
        }
    });
}

/* 高亮被点击的项 */
function setActiveCatItem(id) {
    var catList = this.list.querySelectorAll('.cat-item');
    catList.forEach(function (cat) {
        if (cat.dataset.id == id) {
            cat.classList.add('active');
        } else {
            cat.classList.remove('active');
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

        var row = me.getFormData(me.form); // 获取表单中的数据

        if (!row.id) {
            /* 如果没有id, 说明是在添加一条数据 */
            me._api.add(row);
            me.hideForm();
        } else {
            /* 否则, 就是更新一条数据 */
            me._api.modify(row.id, row);
            me.resetFormLocation();
            me.hideForm();
        }

        me.render();
        me.clearForm(me.form);
    });
}

/* 表单点击事件
 * 当取消按钮被点击时，隐藏表单
 */
function detectFormClick() {
    var me = this;
    this.form.addEventListener('click', function (e) {
        var target = e.target;
        var isCancel = target.dataset.action == 'cancel';
        if (isCancel) {
            me.hideForm(); // 隐藏表单
            me.showUpdatingCatItem(); // 显示正在更新的项
            me.resetFormLocation(); // 重置表单位置
            me.clearForm(me.form); // 清空表单数据
        }
    });
}

/* 重置表单的位置 */
function resetFormLocation() {
    this.list.insertAdjacentElement('afterend', this.form);
}

/* 显示表单 */
function showForm() {
    this.form.hidden = false;
    this.hideAdd();
}

/* 隐藏表单 */
function hideForm() {
    this.form.hidden = true;
    this.showAdd();
}

/* 显示添加按钮 */
function showAdd() {
    this.addCat.hidden = false;
}

/* 隐藏添加按钮 */
function hideAdd() {
    this.addCat.hidden = true;
}

/* 显示正在更新的那一条分组
 * 当用户当前的更新没有完成的时候，点击了其他分组的更新按钮
 * 这是需要显示当前的条目
 */
function showUpdatingCatItem() {
    if (this.updatingCatItem) {
        this.updatingCatItem.hidden = false;
    }
}