window.CatUi = CatUi;

var testList1 = [
    {
        id: 1,
        title: '默认'
    },
    {
        id: 2,
        title: '生活'
    },
    {
        id: 3,
        title: '学习'
    }
];

function CatUi(config) {
    var defConfig = {
        listSelector: '#cat-list',
        formSelector: '#cat-form',
        addSelector: '#cat-add'
    };

    var c = this.config = Object.assign({}, defConfig, config);

    this.list = document.querySelector(c.listSelector);
    this.form = document.querySelector(c.formSelector);
    this.add = document.querySelector(c.addSelector);

    this._api = new CatApi(testList1);
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;

function init() {
    this.render();
}

function render() {
    var me = this;
    var catList = this._api.read();
    this.list.innerHTML = '';
    catList.forEach(function (row) {
       var el = document.createElement('div');
       el.classList.add('row', 'cat-item'); 
       el.dataset.id = row.id;
       el.innerHTML = `
        <div class="title">
            <div>${row.title}<div>
        </div>
        <div class="tool-set">
            ${
                row.id == 1 ?
                    '' :
                    '<span class="update">更新</span><span class="delete">删除</span>'
            }
        </div>
       `;

       me.list.appendChild(el);
    });
}