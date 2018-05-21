window.Api = Api;

function Api(maxId, list) {
    this.maxId = maxId || 1;
    // this.list = list || [];
    this.list = [
        {
            id: 100,
            title: '买菜',
            completed: true
        },
        {
            id: 101,
            title: '洗菜',
            completed: false
        }
    ];
}

Api.prototype.add = add;
Api.prototype.remove = remove;
Api.prototype.updata = updata;
Api.prototype.read = read;

/* 增 */
function add(row) {
    if (row.title == '') {
        return;
    }
    this.maxId++;
    row.id = this.maxId;
    this.list.push(row);
}

/* 删 */
function remove(id) {
    /* 通过ID定位要被删除的元素 */
    var index = findIndexById(this.list, id);
    if (index < 0) {
        return;
    }
    this.list.splice(index, 1);
}

/* 改 */
function updata(id, newRow) {
    var index = findIndexById(this.list, id);
    if (index < 0) {
        return;
    }
    /* 不过有没有都删一遍id, 防止覆盖 */
    delete newRow.id;
    /* 将原来该位置的数据缓存，以便合并替换 */
    var oldRow = this.list[index];
    /* 用assign合并，id不变 */
    this.list[index] = Object.assign({}, oldRow, newRow);
}

/* 查 */
function read(id) {
    /* 传了id则返回该项 */
    if (id) {
        return findById(this.list, id);
    }
    /* 没传则返回整个数组 */
    return this.list;
}

/* 通过id查询索引 */
function findIndexById(arr, id) {
    return arr.findIndex(function (item) {
        return item.id == id;
    });
}

/* 通过id查询元素 */
function findById(arr, id) {
    return arr.find(function (item) {
        return item.id == id;
    });
}