function findAndDelete(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
        arr.splice(i, 1);
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findAndDelete: findAndDelete
};