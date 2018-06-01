import send from "../util/send";

let instance;



function init() {
    if (!instance) {
        instance = new Article();
    }

    return instance;
}

class Article {
    read(page) {
        send.get('/api/tag/read', data => {
            console.log(data);
        });
    }

    remove() {}

    update() {}

    add() {}
}

init();

export default instance;