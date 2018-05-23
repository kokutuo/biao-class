window.CatApi = CatApi;

function CatApi(list, maxId) {
    config = {
        title: {
            maxLength: 10
        }
    };
    list = list || [{
            id: 1,
            title: '默认'
        },
        {
            id: 2,
            title: '学习'
        }
    ];
    maxId = maxId || 1;
    /* 继承显性属性 */
    BaseApi.call(this, list, maxId);
}

/* 继承隐性属性 */
CatApi.prototype = Object.create(BaseApi.prototype);
CatApi.prototype.constructor = CatApi;

CatApi.prototype.add = add;
CatApi.prototype.remove = remove;
CatApi.prototype.modify = modify;
CatApi.prototype.read = read;

function add(row) {
    if (!row.title) {
        return;
    }

    var maxLength = this.config.title.length;
    if (row.title.length > length) {
        throw 'title sholud not greater than ${maxLength}';
    }
    
    return this.$add(row);
}

function remove(id) {
    return this.$remove(id);
}

function modify(id, newRow) {
    return this.$modify(id, newRow);
}

function read(id) {
    return this.$read(id);
}