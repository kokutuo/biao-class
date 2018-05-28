window.TaskApi = TaskApi;

function TaskApi(list, maxId) {
    list = list || [];
    maxId = maxId || 102;
    /* 继承显性属性 */
    BaseApi.call(this, list, maxId);
}

/*继承隐性属性（也就是原型prototype）*/
TaskApi.prototype = Object.create(BaseApi.prototype);
TaskApi.prototype.constructor = TaskApi;

// TaskApi.prototype = {
//     add: add,
//     remove: remove,
//     update: update,
//     read: read
// };

TaskApi.prototype.add = add;
TaskApi.prototype.remove = remove;
TaskApi.prototype.update = update;
TaskApi.prototype.read = read;

function add(row) {
    if (!row.title) {
        throw 'empty content';
    }
    return this.$add(row);
}

function remove(id) {
    return this.$remove(id);
}

function update(id, newRow) {
    return this.$update(id, newRow);
}

function read(id) {
    return this.$read(id);
}