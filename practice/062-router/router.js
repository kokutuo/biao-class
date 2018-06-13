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

        this.root = document.getElementById('root');

        // 如果用户直接访问了某个路由，默认情况下页面不会渲染，
        // 因为没有触发hashchange事件，所以就不会调用go()，更不会渲染
        this.initPage();

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

    initPage() {
        let routeName = this.parseHash(location.hash);
        if (!routeName) {
            routeName = this.state.default;
        }
        this.go(routeName);
    }

    /**
     * 
     * @param {string} routeName 路由名this.state.routes.xxx
     */
    go(routeName) {
        let route = this.state.route[routeName];
        
        if (!route) {
            return;
        }

        // HOOK: "before"
        // 如果当前路由有前置钩子，那么在切换本路由前就应该叫一下这个钩子，
        // 如果钩子返回false就停止执行（也就是不切换页面）
        if ((route.hook && route.hook.before && route.hook.before()) === false) {
            return;
        }

        // 保存上一条历史路由
        this.previous = this.current;

        // 保存当前路由
        this.current = route;

        // 删除之前的页面
        this.removePreviousTpl();

        // 渲染对应的页面
        this.renderCurrent(() => {
            // 如果当前路由有后置钩子，那么在切换本路由后就应该叫一下这个钩子
            route.hook && route.hook.after && route.hook.after();
        });
    }

    /**
     * 清空前一页
     */
    removePreviousTpl() {
        // 清空模板床
        this.root.innerHTML = '';
    }

    /**
     * 渲染当前页
     */
    renderCurrent(onRenderFinish) {
        this.render(this.current, onRenderFinish);
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
        hash = trim(hash, '#/');
        let re = new RegExp('^#?\/?' + hash + '\/?$');

        for (let key in this.state.route) {
            let item = this.state.route[key];
            if (re.test(item.path)) {
                return key;
            }
        }
    }

    /**
     * 通过路由对象渲染页面
     * @param {object} route 
     */
    render(route, onRenderFinish) {
        // 如果已经缓存过则直接使用
        if (route.$template) {
            this.compile(route, onRenderFinish);
            return;
        }
        // 业务路由对象中配置了模板地址，所以可以通过地址获取真是的模板代码(html代码)
        this.getTemplate(route.template_url, tpl => {
            // 取到模板后，将其插到模板床中
            route.$template = tpl;
            this.compile(route, onRenderFinish);
        })
    }

    /**
     * 通过路由对象的 $template 和 data 生成最后的视图
     * @param  route 路由对象
     */
    compile(route, onCompileFinish) {
        this.root.innerHTML = parse(route.$template, route.data);
        if (onCompileFinish) {
            onCompileFinish();
        }
    }

    /**
     * 通过url获取模板(一般为HTML代码)
     * @param  url 
     * @param  onSucceed 
     */
    getTemplate(url, onSucceed) {
        const http = new XMLHttpRequest();
        http.open('get', url);
        http.send();

        http.addEventListener('load', () => {
            onSucceed(http.responseText);
        })
    }
}

function trim(str, cap_list) {
    let arr = cap_list.split('');

    arr.forEach(function (cap) {
        if (str.startsWith(cap)) {
            str = str.substring(1);
            str = trim(str, cap);
        }

        if (str.endsWith(cap)) {
            str = str.substring(0, str.length - 1);
            str = trim(str, cap);
        }
    });

    return str;
}