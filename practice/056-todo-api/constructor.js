function Todo(maxId, list) {
    this.maxId = maxId || 1;
    this.list = list || [];
}

Todo.prototype.add = add;
Todo.prototype.remove = remove;
Todo.prototype.modify = modify;
Todo.prototype.read = read;

/* 增 */
function add(row) {
    maxId++;
    row.id = maxId;
    todoList.push(row);
}

/* 删 */
function remove(id) {
    var index = findIndexById(todoList, id);
    if (index < 0) {
        return;
    }
    todoList.splice(index, 1);
}

/* 改 */
function modify(id, newRow) {
    var index = findIndexById(todoList, id);
    if (index < 0) {
        return;
    }
    delete newRow.id;
    var oldRow = todoList[i];
    todoList[i] = Object.assign({}, oldRow, newRow);
}

/* 查 */
function read(id) {
    var index = findIndexById(todoList, id);
    if (index < 0) {
        return;
    }
    return todoList[index];
}

/* 通过ID找到索引 */
function findIndexById(arr, id) {
    return arr.findIndex(function (item) {
        return item.id == id;
    });
}

var todoList = [{ // 0
        id: 100,
        name: '买菜',
        completed: true,
    },
    {
        id: 101,
        name: '洗菜',
        completed: false
    }
];