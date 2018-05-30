window. CatApi = CatApi;

function CatApi(list, maxId) {
    BaseApi.call(this, list, maxId);
    this.reverseDirection = true;
}

CatApi.prototype = Object.assign(BaseApi.prototype);
CatApi.prototype.constructor = CatApi;

CatApi.prototype.add = add;
CatApi.prototype.remove = remove;
CatApi.prototype.update = update;
CatApi.prototype.read = read;

function add(row) {
    if (!row.title) {
        return;
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