/*

                       ┌─────────────────┐
                       │init(constructor)│
                       └─────────────────┘
                                │
         ┌──────────────────────┼────────────────────┐
         │                      │                    │
┌────────▼────  ───┐ ┌────────────▼    ───────┐ ┌──────────▼─────────┐
│初始化this.current │ │ 拷设置，初始化this.state  │ │监听地址变化       │
└─────────────  ───┘ └─────────────    ───────┘ └────────────────────┘
                                                     │
                                                     │
                    ┌────────────────────────────────┤
                    │                                │
           ┌────────▼────────────┐      ┌────────────▼────────┐
           │      记录当前hash    │      │判断当前页归哪个路由管 │
           └─────────────────────┘      └─────────────────────┘

*/
// let instance;

/**
 * @property {object} current 当前路由信息：{hash: '#/home'}
 * @property {object} state 保存着所有路由的大部分重要信息
 */
class Route {
    /**
     * 对象出生时执行
     * @param {object} config eg:
     *{
         route: {   // 所有路由规则
             home: {    // 其中一条规则（定义了首页地址和相应的模板）
                 path: '#/home',    // 地址栏地址
                 template_url: './template/home.html',  // 模板地址
                 el: '#home',
                 hook: {    // 局部钩子，仅会在当前路由执行
                     before: function () {},
                     after: function () {},
                 }
             },
             about: {   // 另一条规则
                 ...
             },
         },
         // 访问任何一页都会经过一下几个步骤：
         //     before: 已加载设置，地址未发生变化，但未渲染
         //     after: 已加载设置，地址已发生变化，已渲染
         // 你可以将自己的逻辑通过这些插槽(钩子)传进来，当路由
         // 执行到对应位置时就会执行你的函数
         hook: {
             before: function () {

             },
             after: function () {

             }
         },
     }
     */
    constructor(config) {
        // 初始化this.current, 确保以后this.current.xxx不报错
        this.current = {};
        
        // 将传进来的设置拷一份，绑到当前对象上
        this.state = Object.assign({}, config);

        // 监听浏览器地址变化
        this.detectHashChange();
    }

    /**
     * 监听hash的变化
     * 
     * 当浏览器地址改变时应该干什么
     */
    detectHashChange() {
        window.addEventListener('hashchange', () => {
            // 将当前页面的原始 hash 记录在current中, 方便后续使用
            this.current.hash = location.hash;

            // 获取当前 hash 对应的路由
            let routeName = this.parseCurrentHash();

            this.go(routeName);
        })
    }

    /**
     * 
     * @param {string} routeName 路由名this.state.routes.xxx
     */
    go(routeName) {
        let route = this.state.route[routeName];

        // 保存上一条历史路由
        this.previous = this.current;

        // 保存当前路由
        this.current = route;
        
        // 删除之前的页面
        this.removePreviousTpl();
        
        // 渲染对应的页面
        this.renderCurrent();
    }

    /**
     * 清空前一页
     */
    removePreviousTpl() {
        // 拿到前一页的模板床
        let element = document.querySelector(this.previous.el);
        if (!element) {
            return;
        }
        element.innerHTML = '';
    }

    /**
     * 渲染当前页
     */
    renderCurrent() {
        this.render(this.current);
    }

    /**
     * 切换路由
     * 解析当前路由的快捷方式
     * @return 当前地址对应的路由名 this.state.routes.xxx
     */
    parseCurrentHash() {
        return this.parseHash(this.current.hash);
    }

    /**
     * 通过原始hash (如：'#/home'), 解析得到对应的路由名
     * @param {string} hash 
     * @return {string} 路由名, 对应着this.state.routes.xxx
     */
    parseHash(hash) {
        // ...
        return 'home';
    }

    /**
     * 通过路由对象渲染页面
     * @param {object} route 
     */
    render(route) {
        // 业务路由对象中配置了模板地址，所以可以通过地址获取真是的模板代码(html代码)
        this.getTemplate(route.template_url, function (tpl) {
            // 取到模板后，将其插到模板床中
            document.querySelector(route.el).innerHTML = tpl;
        })
    }

    /**
     * 通过url获取模板(一般为HTML代码)
     * @param  url 
     * @param  onSucceed 
     */
    getTemplate(url, onSucceed) {
        // ...
        onSucceed(http.responseText);
    }
}

let o = {};

new Route(o);

// function init(config) {
//     if (!instance) {
//         instance = new Route(config);
//     }
//     return instance;
// }

// export default init;