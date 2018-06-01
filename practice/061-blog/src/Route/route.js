let instance;



class Route {
    constructor() {
        this.current = this.parseHash(window.location.hash) || 'home'
        this.pageList = document.querySelectorAll('.page');
        this.detectClick();
        this.render();
    }

    detectClick() {
        window.addEventListener('click', e => {
            var target = e.target;
            switch (target.nodeName) {
                case 'A':
                    if (target.host) {
                        return;
                    }
                    this.go(target.href);
                    break;
            }
        });
    }

    go(path) {
        let content = this.parseHash(path);
        this.render(content);
    }

    parseHash(path) {
        let content = path.split('/')[length - 1];
        return content;
    }

    render(path) {
        let content = this.parseHash(path);
        var el = document.getElementById(path);
        if (!el) {
            return;
        }
        this.hideAll();
        el.hidden = false;
    }

    hideAll() {
        this.pageList.
        forEach(page => {
            page.hidden = true;
        })
    }
}


function init() {
    if (!instance) {
        instance = new Route;
    }
}

export default {
    init
};