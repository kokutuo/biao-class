/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Route/route.js":
/*!****************************!*\
  !*** ./src/Route/route.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Util_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/helper */ \"./src/Util/helper.js\");\n// let instance;\r\n\r\n// class Route {\r\n//     /**\r\n//      * @property {string} current\r\n//      * 用于保存当前页面的名称，此名称是与页面id是相同的，\r\n//      * 一般通过this.parseHash()解析得到\r\n//      * eg: '#/a' -> 'a' -> <div id='a'>\r\n//      *               ^ this is current   \r\n//      */\r\n\r\n//     constructor() {\r\n//         this.current = this.parseHash(window.location.hash) || 'home';\r\n//         this.pageList = document.querySelectorAll('.page');\r\n//         this.detectClick();\r\n//         this.detectHashChange();\r\n//         this.render();\r\n//     }\r\n\r\n//     detectHashChange() {\r\n//         window.addEventListener('hashchange', e => {\r\n//             this.go(window.location.hash);\r\n//         })\r\n//     }\r\n\r\n//     detectClick() {\r\n//         window.addEventListener('click', e => {\r\n//             var target = e.target;\r\n//             switch (target.nodeName) {\r\n//                 case 'A':\r\n//                     if (target.host) {\r\n//                         return;\r\n//                     }\r\n//                     this.go(target.href);\r\n//                     break;\r\n//             }\r\n//         });\r\n//     }\r\n\r\n//     go(hash) {\r\n//         let oldPath = this.current;\r\n//         let newPath = this.parseHash(hash);\r\n\r\n//         if (oldPath == newPath) {\r\n//             return;\r\n//         }\r\n\r\n//         this.current = newPath;\r\n//         this.render();\r\n//     }\r\n\r\n//     render(path) {\r\n//         let content;\r\n//         path = path || this.current;\r\n//         content = document.getElementById(path);\r\n//         this.hideAll();\r\n//         content.hidden = false;\r\n//     }\r\n\r\n//     hideAll() {\r\n//         this.pageList.\r\n//         forEach(page => {\r\n//             page.hidden = true;\r\n//         })\r\n//     }\r\n\r\n//     parseHash(hash) {\r\n//         let hashArr = hash.split('/');\r\n//         return hashArr[hashArr.length - 1];\r\n//     }\r\n// }\r\n\r\n\r\n// function init() {\r\n//     if (!instance) {\r\n//         instance = new Route;\r\n//     }\r\n// }\r\n\r\n// export default {\r\n//     init\r\n// };\r\n\r\n/* ===================================================================================== */\r\n\r\n\r\n\r\nlet instance;\r\n\r\nclass Route {\r\n    /**\r\n     * 用于保存当前页面名称，此名称与对应的页面id是相同的，\r\n     * 一般是通过this.parse_hash()解析得到\r\n     * '#/a' -> 'a' -> <div id=\"a\">\r\n     *           ^ this is current\r\n     * @property {Object} current\r\n     * @property {Object} previous\r\n     *\r\n     * 默认配置项\r\n     * @property {Object} def （default config）\r\n     *\r\n     * 可配置项\r\n     * @property {Object} config\r\n     * @var config.routes 记录所有路由状态和设置\r\n     * @var config.before 切换前执行的回调函数（使用者的自定义代码）\r\n     * @var config.after 切换后执行的回调函数（使用者的自定义代码）\r\n     *\r\n     * */\r\n\r\n    /**\r\n     * 初始化\r\n     */\r\n    constructor(config) {\r\n        this.param = {};\r\n        this.load_config(config);\r\n\r\n        /*默认为首页，但如果地址栏直接有hash就去已有的地址*/\r\n        this.detect_click(); // 监听页面中所有的点击\r\n        this.detect_hash_change(); // 监听地址变化\r\n        this.go(window.location.hash, {\r\n            force: true\r\n        });\r\n    }\r\n\r\n    /**\r\n     * 加载所有配置\r\n     */\r\n    load_config(config) {\r\n        this.def = {\r\n            hook: {}\r\n        };\r\n        this.config = Object.assign({}, this.def, config);\r\n        this.load_route_config();\r\n    }\r\n\r\n    /**\r\n     * 加载路由配置\r\n     */\r\n    load_route_config() {\r\n        let route_list = this.config.routes;\r\n\r\n        for (var name in route_list) {\r\n            let route = route_list[name];\r\n            let path = this.trim_hash(route.path);\r\n            let path_arr = path.split('/');\r\n            route.param = {};\r\n            route.name = name;\r\n\r\n            path_arr.forEach((segment, index) => {\r\n                let is_param = segment.startsWith(':');\r\n                let key = is_param ? segment.substring(1, segment.length) : segment;\r\n\r\n                route.$segment = route.$segment || {};\r\n                route.$segment[index] = {\r\n                    name: key,\r\n                    position: index,\r\n                    is_param: is_param,\r\n                };\r\n            });\r\n        }\r\n\r\n        console.log('this.config:', this.config);\r\n    }\r\n\r\n    /**\r\n     * 监听地址改变\r\n     */\r\n    detect_hash_change() {\r\n        window.addEventListener('hashchange', () => {\r\n            /*如果发生改变就去对应页面*/\r\n            this.go(window.location.hash);\r\n        });\r\n    }\r\n\r\n    /**\r\n     * 监听页面中所有的点击事件\r\n     * */\r\n    detect_click() {\r\n        document.addEventListener('click', e => {\r\n            var target = e.target;\r\n\r\n            /*看看点击的是哪类元素*/\r\n            switch (target.nodeName) {\r\n                /*如果是<a>元素*/\r\n                case 'A':\r\n                    /*如果是外站链接就停止后续操作*/\r\n                    if (target.host)\r\n                        return;\r\n\r\n                    /*去对应地址*/\r\n                    this.go(target.hash);\r\n                    break;\r\n            }\r\n        });\r\n    }\r\n\r\n    /**\r\n     * 更改路由\r\n     * @param {string} hash 原始hash路径，如: #/about\r\n     * @param {Object} opt 配置项，如：{force: false}\r\n     * */\r\n    go(hash, opt = null) {\r\n        this.hide('#not-found');\r\n        /*钩子*/\r\n        if (this.config.hook.before)\r\n            if (!this.config.hook.before())\r\n                return;\r\n\r\n        hash = hash || 'home';\r\n\r\n        let def = {\r\n            force: false,\r\n        };\r\n\r\n        opt = Object.assign({}, def, opt);\r\n\r\n        /*通过原始hash解析真正的页面名称 /#/home => home */\r\n        let old_state = this.current;\r\n\r\n        /*通过地址（也就是hash）判断是哪一个路由*/\r\n        let new_state = this.parse_hash(hash);\r\n\r\n        this.previous = old_state;\r\n\r\n        if (!new_state) {\r\n            if (this.config.hook.notFount)\r\n                this.config.hook.notFount();\r\n            this.render('#not-found');\r\n            return;\r\n        }\r\n\r\n        // 设置当前页名\r\n        this.current = new_state;\r\n\r\n        console.log('this.current:', this.current);\r\n\r\n        if (!this.current.el)\r\n            throw new ReferenceError(`Please config route ${this.current.name} el`);\r\n\r\n\r\n        /*渲染新页面*/\r\n        this.render();\r\n\r\n        if (this.config.hook.after)\r\n            this.config.hook.after(this.current);\r\n    }\r\n\r\n    compile(route) {\r\n        route = route || this.current;\r\n\r\n        if (!route)\r\n            return;\r\n\r\n        let el = document.querySelector(route.el);\r\n        if (!el || !route.param) return;\r\n        let old = document.querySelectorAll('.compiled');\r\n        old.forEach(item => item.remove());\r\n        // el.insertAdjacentHTML('afterbegin', `<p class=\"compiled\">我的ID是${route.param.id}</p>`);\r\n    }\r\n\r\n    hide(el) {\r\n        var el = document.querySelector(el);\r\n        if (!el)\r\n            return;\r\n        el.hidden = true;\r\n    }\r\n\r\n    /**\r\n     * 渲染页面\r\n     * @param {string} 页面名称\r\n     * */\r\n    render(selector) {\r\n        var content;\r\n        selector = selector || this.current.el;\r\n\r\n        /*先隐藏所有页面*/\r\n        this.hide_previous();\r\n\r\n        /*选中当前页面*/\r\n        content = document.querySelector(selector);\r\n\r\n        if (!content)\r\n            return;\r\n\r\n        this.compile(this.current);\r\n\r\n        content.hidden = false;\r\n    }\r\n\r\n    show(el) {\r\n        /*显示当前页面*/\r\n        document.querySelector(el).hidden = false;\r\n    }\r\n\r\n    /**\r\n     * 隐藏所有页面\r\n     * */\r\n    hide_previous() {\r\n        if (!this.previous)\r\n            return;\r\n\r\n        document.querySelector(this.previous.el).hidden = true;\r\n    }\r\n\r\n    /**\r\n     * 通过原始hash解析页面名称\r\n     * @return {Object} 举例：{path: '/article', param: {id: 1}}\r\n     * */\r\n    parse_hash(hash) {\r\n        hash = this.trim_hash(hash);\r\n        let hash_arr = hash.split('/');\r\n        let routes = this.config.routes;\r\n\r\n        for (var name in routes) {\r\n            let route = routes[name];\r\n            let $segment = route.$segment;\r\n            let matched = true;\r\n\r\n            if (Object.keys($segment).length != hash_arr.length) {\r\n                matched = false;\r\n                continue;\r\n            }\r\n\r\n            hash_arr.forEach(function (segment, index) {\r\n                let $segment = route.$segment[index];\r\n                let $name = $segment.name;\r\n\r\n                if (!$segment) {\r\n                    matched = false;\r\n                    return;\r\n                }\r\n\r\n                if ($segment.is_param) {\r\n                    route.param[$name] = segment;\r\n                } else {\r\n                    if ($name != segment) {\r\n                        matched = false;\r\n                        return;\r\n                    }\r\n                }\r\n            });\r\n\r\n            if (matched)\r\n                return route;\r\n        }\r\n\r\n    }\r\n\r\n    trim_hash(hash) {\r\n        return _Util_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].trim(hash, '#/');\r\n    }\r\n\r\n    // parse_hash (hash) {\r\n    //\r\n    //   let hash_arr = hash.split('/');\r\n    //\r\n    //   let hash_length = hash_arr.length;\r\n    //   let $config, $segment;\r\n    //\r\n    //   hash_arr.forEach((segment, index) => {\r\n    //     if (index < 1)\r\n    //       return;\r\n    //\r\n    //     if (index == 2) {\r\n    //       $config  = this.config.routes[segment];\r\n    //       $segment = $config.$segment;\r\n    //     }\r\n    //\r\n    //     let $param = $segment[index];\r\n    //\r\n    //     if ($param.is_param) {\r\n    //       $config.param              = $config.param || {};\r\n    //       $config.param[$param.name] = segment;\r\n    //     }\r\n    //\r\n    //     console.log(this.config.routes.article.param);\r\n    //   });\r\n    //\r\n    //   return hash_arr[hash_arr.length - 1];\r\n    // }\r\n}\r\n\r\n/*初始化*/\r\nfunction init(config) {\r\n    if (!instance)\r\n        instance = new Route(config);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    init\r\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUm91dGUvcm91dGUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUm91dGUvcm91dGUuanM/MGVhMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsZXQgaW5zdGFuY2U7XHJcblxyXG4vLyBjbGFzcyBSb3V0ZSB7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjdXJyZW50XHJcbi8vICAgICAgKiDnlKjkuo7kv53lrZjlvZPliY3pobXpnaLnmoTlkI3np7DvvIzmraTlkI3np7DmmK/kuI7pobXpnaJpZOaYr+ebuOWQjOeahO+8jFxyXG4vLyAgICAgICog5LiA6Iis6YCa6L+HdGhpcy5wYXJzZUhhc2goKeino+aekOW+l+WIsFxyXG4vLyAgICAgICogZWc6ICcjL2EnIC0+ICdhJyAtPiA8ZGl2IGlkPSdhJz5cclxuLy8gICAgICAqICAgICAgICAgICAgICAgXiB0aGlzIGlzIGN1cnJlbnQgICBcclxuLy8gICAgICAqL1xyXG5cclxuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xyXG4vLyAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB8fCAnaG9tZSc7XHJcbi8vICAgICAgICAgdGhpcy5wYWdlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdlJyk7XHJcbi8vICAgICAgICAgdGhpcy5kZXRlY3RDbGljaygpO1xyXG4vLyAgICAgICAgIHRoaXMuZGV0ZWN0SGFzaENoYW5nZSgpO1xyXG4vLyAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZGV0ZWN0SGFzaENoYW5nZSgpIHtcclxuLy8gICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGUgPT4ge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmdvKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGRldGVjdENsaWNrKCkge1xyXG4vLyAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4vLyAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbi8vICAgICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjYXNlICdBJzpcclxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmhvc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmdvKHRhcmdldC5ocmVmKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGdvKGhhc2gpIHtcclxuLy8gICAgICAgICBsZXQgb2xkUGF0aCA9IHRoaXMuY3VycmVudDtcclxuLy8gICAgICAgICBsZXQgbmV3UGF0aCA9IHRoaXMucGFyc2VIYXNoKGhhc2gpO1xyXG5cclxuLy8gICAgICAgICBpZiAob2xkUGF0aCA9PSBuZXdQYXRoKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHRoaXMuY3VycmVudCA9IG5ld1BhdGg7XHJcbi8vICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZW5kZXIocGF0aCkge1xyXG4vLyAgICAgICAgIGxldCBjb250ZW50O1xyXG4vLyAgICAgICAgIHBhdGggPSBwYXRoIHx8IHRoaXMuY3VycmVudDtcclxuLy8gICAgICAgICBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGF0aCk7XHJcbi8vICAgICAgICAgdGhpcy5oaWRlQWxsKCk7XHJcbi8vICAgICAgICAgY29udGVudC5oaWRkZW4gPSBmYWxzZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBoaWRlQWxsKCkge1xyXG4vLyAgICAgICAgIHRoaXMucGFnZUxpc3QuXHJcbi8vICAgICAgICAgZm9yRWFjaChwYWdlID0+IHtcclxuLy8gICAgICAgICAgICAgcGFnZS5oaWRkZW4gPSB0cnVlO1xyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcGFyc2VIYXNoKGhhc2gpIHtcclxuLy8gICAgICAgICBsZXQgaGFzaEFyciA9IGhhc2guc3BsaXQoJy8nKTtcclxuLy8gICAgICAgICByZXR1cm4gaGFzaEFycltoYXNoQXJyLmxlbmd0aCAtIDFdO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG5cclxuLy8gZnVuY3Rpb24gaW5pdCgpIHtcclxuLy8gICAgIGlmICghaW5zdGFuY2UpIHtcclxuLy8gICAgICAgICBpbnN0YW5jZSA9IG5ldyBSb3V0ZTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQge1xyXG4vLyAgICAgaW5pdFxyXG4vLyB9O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuaW1wb3J0IGhlbHBlciBmcm9tICcuLi9VdGlsL2hlbHBlcic7XHJcblxyXG5sZXQgaW5zdGFuY2U7XHJcblxyXG5jbGFzcyBSb3V0ZSB7XHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6juS/neWtmOW9k+WJjemhtemdouWQjeensO+8jOatpOWQjeensOS4juWvueW6lOeahOmhtemdomlk5piv55u45ZCM55qE77yMXHJcbiAgICAgKiDkuIDoiKzmmK/pgJrov4d0aGlzLnBhcnNlX2hhc2goKeino+aekOW+l+WIsFxyXG4gICAgICogJyMvYScgLT4gJ2EnIC0+IDxkaXYgaWQ9XCJhXCI+XHJcbiAgICAgKiAgICAgICAgICAgXiB0aGlzIGlzIGN1cnJlbnRcclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjdXJyZW50XHJcbiAgICAgKiBAcHJvcGVydHkge09iamVjdH0gcHJldmlvdXNcclxuICAgICAqXHJcbiAgICAgKiDpu5jorqTphY3nva7poblcclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkZWYg77yIZGVmYXVsdCBjb25maWfvvIlcclxuICAgICAqXHJcbiAgICAgKiDlj6/phY3nva7poblcclxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjb25maWdcclxuICAgICAqIEB2YXIgY29uZmlnLnJvdXRlcyDorrDlvZXmiYDmnInot6/nlLHnirbmgIHlkozorr7nva5cclxuICAgICAqIEB2YXIgY29uZmlnLmJlZm9yZSDliIfmjaLliY3miafooYznmoTlm57osIPlh73mlbDvvIjkvb/nlKjogIXnmoToh6rlrprkuYnku6PnoIHvvIlcclxuICAgICAqIEB2YXIgY29uZmlnLmFmdGVyIOWIh+aNouWQjuaJp+ihjOeahOWbnuiwg+WHveaVsO+8iOS9v+eUqOiAheeahOiHquWumuS5ieS7o+egge+8iVxyXG4gICAgICpcclxuICAgICAqICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHt9O1xyXG4gICAgICAgIHRoaXMubG9hZF9jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAgICAgLyrpu5jorqTkuLrpppbpobXvvIzkvYblpoLmnpzlnLDlnYDmoI/nm7TmjqXmnIloYXNo5bCx5Y675bey5pyJ55qE5Zyw5Z2AKi9cclxuICAgICAgICB0aGlzLmRldGVjdF9jbGljaygpOyAvLyDnm5HlkKzpobXpnaLkuK3miYDmnInnmoTngrnlh7tcclxuICAgICAgICB0aGlzLmRldGVjdF9oYXNoX2NoYW5nZSgpOyAvLyDnm5HlkKzlnLDlnYDlj5jljJZcclxuICAgICAgICB0aGlzLmdvKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCB7XHJcbiAgICAgICAgICAgIGZvcmNlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3miYDmnInphY3nva5cclxuICAgICAqL1xyXG4gICAgbG9hZF9jb25maWcoY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5kZWYgPSB7XHJcbiAgICAgICAgICAgIGhvb2s6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMubG9hZF9yb3V0ZV9jb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vei3r+eUsemFjee9rlxyXG4gICAgICovXHJcbiAgICBsb2FkX3JvdXRlX2NvbmZpZygpIHtcclxuICAgICAgICBsZXQgcm91dGVfbGlzdCA9IHRoaXMuY29uZmlnLnJvdXRlcztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiByb3V0ZV9saXN0KSB7XHJcbiAgICAgICAgICAgIGxldCByb3V0ZSA9IHJvdXRlX2xpc3RbbmFtZV07XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gdGhpcy50cmltX2hhc2gocm91dGUucGF0aCk7XHJcbiAgICAgICAgICAgIGxldCBwYXRoX2FyciA9IHBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgcm91dGUucGFyYW0gPSB7fTtcclxuICAgICAgICAgICAgcm91dGUubmFtZSA9IG5hbWU7XHJcblxyXG4gICAgICAgICAgICBwYXRoX2Fyci5mb3JFYWNoKChzZWdtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzX3BhcmFtID0gc2VnbWVudC5zdGFydHNXaXRoKCc6Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaXNfcGFyYW0gPyBzZWdtZW50LnN1YnN0cmluZygxLCBzZWdtZW50Lmxlbmd0aCkgOiBzZWdtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJvdXRlLiRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnQgfHwge307XHJcbiAgICAgICAgICAgICAgICByb3V0ZS4kc2VnbWVudFtpbmRleF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBpc19wYXJhbTogaXNfcGFyYW0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmNvbmZpZzonLCB0aGlzLmNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmlLnlj5hcclxuICAgICAqL1xyXG4gICAgZGV0ZWN0X2hhc2hfY2hhbmdlKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvKuWmguaenOWPkeeUn+aUueWPmOWwseWOu+WvueW6lOmhtemdoiovXHJcbiAgICAgICAgICAgIHRoaXMuZ28od2luZG93LmxvY2F0aW9uLmhhc2gpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs6aG16Z2i5Lit5omA5pyJ55qE54K55Ye75LqL5Lu2XHJcbiAgICAgKiAqL1xyXG4gICAgZGV0ZWN0X2NsaWNrKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIC8q55yL55yL54K55Ye755qE5piv5ZOq57G75YWD57SgKi9cclxuICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQubm9kZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIC8q5aaC5p6c5pivPGE+5YWD57SgKi9cclxuICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxyXG4gICAgICAgICAgICAgICAgICAgIC8q5aaC5p6c5piv5aSW56uZ6ZO+5o6l5bCx5YGc5q2i5ZCO57ut5pON5L2cKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmhvc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyrljrvlr7nlupTlnLDlnYAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ28odGFyZ2V0Lmhhc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlLnot6/nlLFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIOWOn+Wni2hhc2jot6/lvoTvvIzlpoI6ICMvYWJvdXRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHQg6YWN572u6aG577yM5aaC77yae2ZvcmNlOiBmYWxzZX1cclxuICAgICAqICovXHJcbiAgICBnbyhoYXNoLCBvcHQgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCcjbm90LWZvdW5kJyk7XHJcbiAgICAgICAgLyrpkqnlrZAqL1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSlcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5ob29rLmJlZm9yZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBoYXNoID0gaGFzaCB8fCAnaG9tZSc7XHJcblxyXG4gICAgICAgIGxldCBkZWYgPSB7XHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWYsIG9wdCk7XHJcblxyXG4gICAgICAgIC8q6YCa6L+H5Y6f5aeLaGFzaOino+aekOecn+ato+eahOmhtemdouWQjeensCAvIy9ob21lID0+IGhvbWUgKi9cclxuICAgICAgICBsZXQgb2xkX3N0YXRlID0gdGhpcy5jdXJyZW50O1xyXG5cclxuICAgICAgICAvKumAmui/h+WcsOWdgO+8iOS5n+WwseaYr2hhc2jvvInliKTmlq3mmK/lk6rkuIDkuKrot6/nlLEqL1xyXG4gICAgICAgIGxldCBuZXdfc3RhdGUgPSB0aGlzLnBhcnNlX2hhc2goaGFzaCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSBvbGRfc3RhdGU7XHJcblxyXG4gICAgICAgIGlmICghbmV3X3N0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5ob29rLm5vdEZvdW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuaG9vay5ub3RGb3VudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcignI25vdC1mb3VuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDorr7nva7lvZPliY3pobXlkI1cclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXdfc3RhdGU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmN1cnJlbnQ6JywgdGhpcy5jdXJyZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQuZWwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgUGxlYXNlIGNvbmZpZyByb3V0ZSAke3RoaXMuY3VycmVudC5uYW1lfSBlbGApO1xyXG5cclxuXHJcbiAgICAgICAgLyrmuLLmn5PmlrDpobXpnaIqL1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ob29rLmFmdGVyKVxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5ob29rLmFmdGVyKHRoaXMuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGlsZShyb3V0ZSkge1xyXG4gICAgICAgIHJvdXRlID0gcm91dGUgfHwgdGhpcy5jdXJyZW50O1xyXG5cclxuICAgICAgICBpZiAoIXJvdXRlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm91dGUuZWwpO1xyXG4gICAgICAgIGlmICghZWwgfHwgIXJvdXRlLnBhcmFtKSByZXR1cm47XHJcbiAgICAgICAgbGV0IG9sZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21waWxlZCcpO1xyXG4gICAgICAgIG9sZC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW1vdmUoKSk7XHJcbiAgICAgICAgLy8gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYDxwIGNsYXNzPVwiY29tcGlsZWRcIj7miJHnmoRJROaYryR7cm91dGUucGFyYW0uaWR9PC9wPmApO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoZWwpIHtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuICAgICAgICBpZiAoIWVsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZWwuaGlkZGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+mhtemdolxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IOmhtemdouWQjeensFxyXG4gICAgICogKi9cclxuICAgIHJlbmRlcihzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciBjb250ZW50O1xyXG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5jdXJyZW50LmVsO1xyXG5cclxuICAgICAgICAvKuWFiOmakOiXj+aJgOaciemhtemdoiovXHJcbiAgICAgICAgdGhpcy5oaWRlX3ByZXZpb3VzKCk7XHJcblxyXG4gICAgICAgIC8q6YCJ5Lit5b2T5YmN6aG16Z2iKi9cclxuICAgICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmICghY29udGVudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBpbGUodGhpcy5jdXJyZW50KTtcclxuXHJcbiAgICAgICAgY29udGVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KGVsKSB7XHJcbiAgICAgICAgLyrmmL7npLrlvZPliY3pobXpnaIqL1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5omA5pyJ6aG16Z2iXHJcbiAgICAgKiAqL1xyXG4gICAgaGlkZV9wcmV2aW91cygpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJldmlvdXMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnByZXZpb3VzLmVsKS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Y6f5aeLaGFzaOino+aekOmhtemdouWQjeensFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSDkuL7kvovvvJp7cGF0aDogJy9hcnRpY2xlJywgcGFyYW06IHtpZDogMX19XHJcbiAgICAgKiAqL1xyXG4gICAgcGFyc2VfaGFzaChoYXNoKSB7XHJcbiAgICAgICAgaGFzaCA9IHRoaXMudHJpbV9oYXNoKGhhc2gpO1xyXG4gICAgICAgIGxldCBoYXNoX2FyciA9IGhhc2guc3BsaXQoJy8nKTtcclxuICAgICAgICBsZXQgcm91dGVzID0gdGhpcy5jb25maWcucm91dGVzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHJvdXRlcykge1xyXG4gICAgICAgICAgICBsZXQgcm91dGUgPSByb3V0ZXNbbmFtZV07XHJcbiAgICAgICAgICAgIGxldCAkc2VnbWVudCA9IHJvdXRlLiRzZWdtZW50O1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoJHNlZ21lbnQpLmxlbmd0aCAhPSBoYXNoX2Fyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBoYXNoX2Fyci5mb3JFYWNoKGZ1bmN0aW9uIChzZWdtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzZWdtZW50ID0gcm91dGUuJHNlZ21lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRuYW1lID0gJHNlZ21lbnQubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISRzZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlZ21lbnQuaXNfcGFyYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZS5wYXJhbVskbmFtZV0gPSBzZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJG5hbWUgIT0gc2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0cmltX2hhc2goaGFzaCkge1xyXG4gICAgICAgIHJldHVybiBoZWxwZXIudHJpbShoYXNoLCAnIy8nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwYXJzZV9oYXNoIChoYXNoKSB7XHJcbiAgICAvL1xyXG4gICAgLy8gICBsZXQgaGFzaF9hcnIgPSBoYXNoLnNwbGl0KCcvJyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICBsZXQgaGFzaF9sZW5ndGggPSBoYXNoX2Fyci5sZW5ndGg7XHJcbiAgICAvLyAgIGxldCAkY29uZmlnLCAkc2VnbWVudDtcclxuICAgIC8vXHJcbiAgICAvLyAgIGhhc2hfYXJyLmZvckVhY2goKHNlZ21lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAvLyAgICAgaWYgKGluZGV4IDwgMSlcclxuICAgIC8vICAgICAgIHJldHVybjtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKGluZGV4ID09IDIpIHtcclxuICAgIC8vICAgICAgICRjb25maWcgID0gdGhpcy5jb25maWcucm91dGVzW3NlZ21lbnRdO1xyXG4gICAgLy8gICAgICAgJHNlZ21lbnQgPSAkY29uZmlnLiRzZWdtZW50O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vXHJcbiAgICAvLyAgICAgbGV0ICRwYXJhbSA9ICRzZWdtZW50W2luZGV4XTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKCRwYXJhbS5pc19wYXJhbSkge1xyXG4gICAgLy8gICAgICAgJGNvbmZpZy5wYXJhbSAgICAgICAgICAgICAgPSAkY29uZmlnLnBhcmFtIHx8IHt9O1xyXG4gICAgLy8gICAgICAgJGNvbmZpZy5wYXJhbVskcGFyYW0ubmFtZV0gPSBzZWdtZW50O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcucm91dGVzLmFydGljbGUucGFyYW0pO1xyXG4gICAgLy8gICB9KTtcclxuICAgIC8vXHJcbiAgICAvLyAgIHJldHVybiBoYXNoX2FycltoYXNoX2Fyci5sZW5ndGggLSAxXTtcclxuICAgIC8vIH1cclxufVxyXG5cclxuLyrliJ3lp4vljJYqL1xyXG5mdW5jdGlvbiBpbml0KGNvbmZpZykge1xyXG4gICAgaWYgKCFpbnN0YW5jZSlcclxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBSb3V0ZShjb25maWcpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpbml0XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Route/route.js\n");

/***/ }),

/***/ "./src/Util/helper.js":
/*!****************************!*\
  !*** ./src/Util/helper.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst output = {\r\n    trim: trim,\r\n};\r\n\r\nfunction trim(str, cap_list) {\r\n    let arr = cap_list.split('');\r\n\r\n    arr.forEach(function (cap) {\r\n        if (str.startsWith(cap)) {\r\n            str = str.substring(1);\r\n            str = trim(str, cap);\r\n        }\r\n\r\n        if (str.endsWith(cap)) {\r\n            str = str.substring(0, str.length - 1);\r\n            str = trim(str, cap);\r\n        }\r\n    });\r\n\r\n    return str;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (output);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbC9oZWxwZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVXRpbC9oZWxwZXIuanM/YzVhMiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBvdXRwdXQgPSB7XHJcbiAgICB0cmltOiB0cmltLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gdHJpbShzdHIsIGNhcF9saXN0KSB7XHJcbiAgICBsZXQgYXJyID0gY2FwX2xpc3Quc3BsaXQoJycpO1xyXG5cclxuICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChjYXApIHtcclxuICAgICAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoY2FwKSkge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBzdHIgPSB0cmltKHN0ciwgY2FwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHIuZW5kc1dpdGgoY2FwKSkge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgc3RyID0gdHJpbShzdHIsIGNhcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3V0cHV0OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Util/helper.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Route_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Route/route */ \"./src/Route/route.js\");\n// import article from './Api/article';\r\n\r\n\r\nlet config = {\r\n    routes: {\r\n        home: {\r\n            path: '/home',\r\n            el: '#home',\r\n        },\r\n        about: {\r\n            path: '/about',\r\n            el: '#about',\r\n        },\r\n        article: {\r\n            path: '/article/:author/:id', // ['article', ':author', ':id']\r\n            el: '#article',\r\n        },\r\n        article_list: {\r\n            path: '/article-list',\r\n            el: '#article-list',\r\n        },\r\n        tag: {\r\n            path: '/tag',\r\n            el: '#tag',\r\n        },\r\n    },\r\n    hook: {\r\n        before: function () {\r\n            return true;\r\n            // let he_is_admin = true;\r\n            // if (!he_is_admin)\r\n            //   return false;\r\n            // return true;\r\n        },\r\n        after: function (route) {\r\n            // route.param.yo; // undefined\r\n            // console.log('后');\r\n            // console.log('route:', route);\r\n        },\r\n    },\r\n};\r\n\r\n_Route_route__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n    .init(config);\r\n\r\n// article.read();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgYXJ0aWNsZSBmcm9tICcuL0FwaS9hcnRpY2xlJztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4vUm91dGUvcm91dGUnO1xyXG5cclxubGV0IGNvbmZpZyA9IHtcclxuICAgIHJvdXRlczoge1xyXG4gICAgICAgIGhvbWU6IHtcclxuICAgICAgICAgICAgcGF0aDogJy9ob21lJyxcclxuICAgICAgICAgICAgZWw6ICcjaG9tZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhYm91dDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgICAgICAgZWw6ICcjYWJvdXQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJ0aWNsZToge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUvOmF1dGhvci86aWQnLCAvLyBbJ2FydGljbGUnLCAnOmF1dGhvcicsICc6aWQnXVxyXG4gICAgICAgICAgICBlbDogJyNhcnRpY2xlJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFydGljbGVfbGlzdDoge1xyXG4gICAgICAgICAgICBwYXRoOiAnL2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgICAgIGVsOiAnI2FydGljbGUtbGlzdCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWc6IHtcclxuICAgICAgICAgICAgcGF0aDogJy90YWcnLFxyXG4gICAgICAgICAgICBlbDogJyN0YWcnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgaG9vazoge1xyXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gbGV0IGhlX2lzX2FkbWluID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gaWYgKCFoZV9pc19hZG1pbilcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uIChyb3V0ZSkge1xyXG4gICAgICAgICAgICAvLyByb3V0ZS5wYXJhbS55bzsgLy8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCflkI4nKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3JvdXRlOicsIHJvdXRlKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbnJvdXRlXHJcbiAgICAuaW5pdChjb25maWcpO1xyXG5cclxuLy8gYXJ0aWNsZS5yZWFkKCk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });