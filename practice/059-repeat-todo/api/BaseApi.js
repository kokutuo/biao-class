window.BaseApi = BaseApi;

function BaseApi(list, maxId) {
    this.list = list || [];
    this.maxId = maxId || 102;
}


BaseApi.prototype.$add = add;
BaseApi.prototype.$remove = remove;
BaseApi.prototype.$update = update;
BaseApi.prototype.$read = read;

/* 增 */
function add(row) {
    this.maxId++; // id自增，防止重复
    row.id = this.maxId;
    this.list.unshift(row);
}

/* 删 */
function remove(id) {
    var index = findIndexById(this.list, id);
    if (index < 0) {
        return;
    }
    this.list.splice(index, 1);
}

/* 改 */
function update(id, newRow) {
    var i = findIndexById(this.list, id);    
    if (i < 0) {
        return;
    }
    delete newRow.id; // 不过有没有id, 先删一遍, 防止覆盖
    var oldRow = this.list[i]; // 缓存旧数据, 便于合并
    this.list[i] = Object.assign({}, oldRow, newRow); //  用新数据覆盖旧数据
}

/* 查
 * 如果传了id, 则返回对应的那那条数据
 * 如果没传id, 则返回整个数组
 */
function read(id) {
    if (id) {
        return find(this.list, id);
    }
    return this.list;
}

/* 通过id找到对应数据的索引 */
function findIndexById(arr, id) {
    return arr.findIndex(function (row) {
        return row.id == id;
    });
}

/* 通过id找到对应的数据 */
function find(arr, id) {
    return arr.find(function (row) {
        return row.id == id;
    });
}