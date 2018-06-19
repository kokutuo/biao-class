const Home = Vue.component('home', {
    template: `
    <div>
        <h1>我的文章</h1>
        <router-link :to="'/article/' + row.id" v-for='row in articleList' key='id'>{{row.title}}<br></router-link>
    </div>
    `,
    data: function () {
        return {
            articleList: []
        }
    },
    created: function () {
        http
            .post('article/read', {
                only: ['title', 'id']
            })
            .then(res => {
                this.articleList = res.data.data;
            });
    },
});

const NewArticle = Vue.component('new-article', {
    template: `
    <div>
        <h1>写文章</h1>
        <form @submit.prevent='add'>
            <input type="text" v-model='current.title' placeholder='标题'>
            <input type="text" v-model='current.author' placeholder='作者'>
            <textarea v-model='current.content' placeholder='内容'></textarea>
            <button>提交</button>
        </form>
    </div>
    `,
    data: function () {
        return {
            current: {}
        };
    },
    methods: {
        add: function () {
            http
                .post('article/create', this.current)
                .then(res => {
                    if (res.data.succeed) {
                        this.current = {};
                    }
                });
        },
    },
});

const ArticleDetail = Vue.component('article-detail', {
    template: `
    <div>
        <h1 v-model='current.title'>{{current.title}}</h1>
        <h3 v-model='current.author'>{{current.author}}</h3>
        <p v-model='current.content'>{{current.content}}</p>
    </div>
    `,
    data: function () {
        return {
            current: {}
        };
    },
    created: function () {
        http
            .post('article/find', {id: this.$route.params.id})
            .then(res => {
                this.current = res.data.data;
            });
    },
})

let vm = new Vue({
    el: '#app',
    router: new VueRouter({
        routes: [{
                path: '/',
                component: Home
            },
            {
                path: '/article/new',
                component: NewArticle
            },
            {
                path: '/article/:id',
                component: ArticleDetail
            },
        ],

    }),
});
// 创建表结构
// http.post('MODEL/CREATE', {
//     name: 'article',
//     structure: [
//         {
//             name: 'title',
//             type: 'string',
//             nullable: false
//         },
//         {
//             name: 'content',
//             type: 'text',
//             nullable: false
//         },
//         {
//             name: 'author',
//             type: 'string',
//             nullable: true
//         },
//         {
//             name: 'created_at',
//             type: 'dateTime',
//             nullable: true
//         },
//     ],
// });