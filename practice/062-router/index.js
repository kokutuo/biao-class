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
        create: {
            path: '/create',
            template_url: './template/create.html',
            hook: {
                after: () => {
                    let form = document.getElementById('create-article');
                    form.addEventListener('submit', e => {
                        e.preventDefault();
                        let row = {};

                        row.title = form.querySelector('[name=title]').value;
                        row.content = form.querySelector('[name=content]').value;
                        appData.article.list.push(row);
                        form.reset();
                    });
                },
            },
        },
        article: {
            path: '/article',
            template_url: './template/article.html',
            hook: {
                beforeRender: (route) => {                    
                    route.data.param = route.$param;
                },
            },
            data: {},
        }
    },
    hook: {
        before: () => {},
        after: () => {},
    },
};

let route = new Route(o);

// counter();

// function counter() {
//     let count = 0
//     setInterval(function () {
//         console.log(count);
//         count++;
//     }, 1000);
// }