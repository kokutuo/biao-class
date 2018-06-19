window.util = {
    removeElById: function (arr, id) {
        let i = this.findIndexById(arr, id);
        if (!i) {
            return;
        }
        arr.splice(i, 1);
    },

    findIndexById: function (arr, id) {
        return arr.findIndex(item => {
            return item.id == id;
        });
    }
}