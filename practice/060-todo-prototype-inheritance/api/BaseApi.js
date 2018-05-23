window.BaseApi = BaseApi;

function BaseApi(list, maxId) {
    this.list = list;
    this.maxId = maxId || 1;
}

BaseApi.prototype.$add = $add;
BaseApi.prototype.$modify = $modify;
BaseApi.prototype.$read = $read;
BaseApi.prototype.$remove = $remove;

/* 增 */
function $add(row) {
    this.maxId++;
    row.id = this.maxId;
    this.list.push(row);
}

/* 删 */
function $remove(id) {
    var index = findIndexById(this.list, id);
    if (index < 0) {
        return;
    }
    this.list.splice(index, 1);
}

/* 改 */
function $modify(id, newRow) {
    var index = findIndexById(this.list, id);
    if (index < 0) {
        return;
    }
    /* 删除更新数据的id, 防止 */
    delete newRow.id;
    var oldRow = this.list[index];
    this.list[index] = Object.assign({}, oldRow, newRow);
}

/* 查 */
function $read(id) {
    if (id) {
        return findById(this.list, id);
    }

    return this.list;
}

/* 通过ID找到索引 */
function findIndexById(arr, id) {
    return arr.findIndex(function (item) {
        return item.id == id;
    });
}

/* 通过id找到数组项 */
function findById(arr, id) {
    return arr.find(function (item) {
        return item.id == id;
    });
}
