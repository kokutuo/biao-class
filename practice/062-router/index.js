let appData = {
    article: {
        list: [{
                id: 1,
                title: 'AAA',
                content: 'ldjfioasdjflsjdfoijdgsjlkdjglkjasdfijsafdjlasdjf;',
            },
            {
                id: 2,
                title: 'BBB',
                content: 'sldjfiojretgojadglkjafdoijaodfjlklasdjgljadgflsjdofjdsoifjsdlgsdjlajsdogidf',
            }
        ]
    }
}

let o = {
    default: 'home',
    route: {
        home: {
            path: '#/home',
            template_url: './template/home.html',
            data: {
                name: '王花花',
                age: 11,
            },
            hook: {
                after: () => {
                    let list = appData.article.list;

                    let elList = document.getElementById('article-list');
                    list.forEach(row => {
                        let elItem = document.createElement('div');
                        elItem.innerHTML = `
                        <a href='#/article?id=${row.id}'>${row.title}</a>
                        `;

                        elList.appendChild(elItem);
                    })
                },
            }
        },
        about: {
            path: '#/about',
            template_url: './template/about.html',
            data: {
                name: '李拴蛋',
                age: 20,
            }
        },
    },
    hook: {
        before: () => {},
        after: () => {},
    },
};

let route = new Route(o);