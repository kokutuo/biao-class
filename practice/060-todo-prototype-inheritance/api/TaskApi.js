window.TaskApi = TaskApi;

function TaskApi(list, maxId) {
    maxId = maxId || 1;
    list = list || [];
    /* 继承显性属性（也就是原型prototype） */
    BaseApi.call(this, list, maxId);
}

/* 继承隐性属性 */
TaskApi.prototype = Object.create(BaseApi.prototype);
TaskApi.prototype.constructor = TaskApi;

TaskApi.prototype.add = add;
TaskApi.prototype.remove = remove;
TaskApi.prototype.modify = modify;
TaskApi.prototype.read = read;

function add(row) {
    if (!row.title) {
        return;
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