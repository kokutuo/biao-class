function store_set(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
}

function store_get(key) {
    var json = localStorage.getItem(key);
    return JSON.parse(json);
}

module.exports = {
    store_set: store_set,
    store_get: store_get
};