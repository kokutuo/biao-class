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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/element.js":
/*!***********************!*\
  !*** ./js/element.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* UI元素相关 */\r\n\r\nvar search = __webpack_require__(/*! ./search */ \"./js/search.js\");\r\n\r\n/* 选中页面中要用到的要素 */\r\nvar form,\r\n    input,\r\n    amount,\r\n    pagination_container,\r\n    pagination,\r\n    user_list;\r\n\r\nfunction set_form() {\r\n    return form = document.getElementById('search-form');\r\n}\r\n\r\nfunction get_form() { \r\n    return form;\r\n}\r\n\r\nfunction set_input() {\r\n    return input = document.getElementById('search-input');\r\n}\r\n\r\nfunction get_input() {\r\n    return input;\r\n}\r\n\r\nfunction set_amount() {\r\n    return amount = document.getElementById('amount');\r\n}\r\n\r\nfunction get_amount() {\r\n    return amount;\r\n}\r\n\r\nfunction set_pagination_container() {\r\n    return pagination_container = document.getElementById('pagination-container');\r\n}\r\n\r\nfunction get_pagination_container() {\r\n    return pagination_container;\r\n}\r\n\r\nfunction set_pagination() {\r\n    return pagination = document.getElementById('pagination');\r\n}\r\n\r\nfunction get_pagination() {\r\n    return pagination;\r\n}\r\n\r\nfunction set_user_list() {\r\n    return user_list = document.getElementById('user-list');\r\n}\r\n\r\nfunction get_user_list() {\r\n    return user_list;\r\n}\r\n\r\nset_form();\r\nset_amount();\r\nset_input();\r\nset_pagination();\r\nset_pagination_container();\r\nset_user_list();\r\n\r\n/*渲染用户列表\r\n * @param Array data 用于渲染的数据\r\n * */\r\nfunction render_usr_list(data) {\r\n\r\n    var html = '';\r\n\r\n    data.forEach(function (user) {\r\n        html = html + `\r\n       <div class=\"user\">\r\n            <a class=\"avatar\" target=\"_blank\" href=\"${user.html_url}\">\r\n            <img src=\"${user.avatar_url}\">\r\n            </a>\r\n            <div class=\"info\">\r\n                <div class=\"username\">${user.login}</div>\r\n               <div><a target=\"_blank\" href=\"${user.html_url}\">${user.html_url}</a></div>\r\n            </div>\r\n        </div>\r\n       `;\r\n    });\r\n\r\n    user_list.innerHTML = html;\r\n}\r\n\r\nfunction render_amount(data) {\r\n    amount.innerHTML = `找到${data.total_count}条搜索结果`;\r\n}\r\n\r\nmodule.exports = {\r\n    get_form: get_form,\r\n    get_input: get_input,\r\n    get_pagination: get_pagination,\r\n    get_pagination_container: get_pagination_container,\r\n    render_usr_list: render_usr_list,\r\n    render_amount: render_amount\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9lbGVtZW50LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZWxlbWVudC5qcz8yODZkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFVJ5YWD57Sg55u45YWzICovXHJcblxyXG52YXIgc2VhcmNoID0gcmVxdWlyZSgnLi9zZWFyY2gnKTtcclxuXHJcbi8qIOmAieS4remhtemdouS4reimgeeUqOWIsOeahOimgee0oCAqL1xyXG52YXIgZm9ybSxcclxuICAgIGlucHV0LFxyXG4gICAgYW1vdW50LFxyXG4gICAgcGFnaW5hdGlvbl9jb250YWluZXIsXHJcbiAgICBwYWdpbmF0aW9uLFxyXG4gICAgdXNlcl9saXN0O1xyXG5cclxuZnVuY3Rpb24gc2V0X2Zvcm0oKSB7XHJcbiAgICByZXR1cm4gZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtZm9ybScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfZm9ybSgpIHsgXHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0X2lucHV0KCkge1xyXG4gICAgcmV0dXJuIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfaW5wdXQoKSB7XHJcbiAgICByZXR1cm4gaW5wdXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldF9hbW91bnQoKSB7XHJcbiAgICByZXR1cm4gYW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Ftb3VudCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYW1vdW50KCkge1xyXG4gICAgcmV0dXJuIGFtb3VudDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0X3BhZ2luYXRpb25fY29udGFpbmVyKCkge1xyXG4gICAgcmV0dXJuIHBhZ2luYXRpb25fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2luYXRpb24tY29udGFpbmVyJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9wYWdpbmF0aW9uX2NvbnRhaW5lcigpIHtcclxuICAgIHJldHVybiBwYWdpbmF0aW9uX2NvbnRhaW5lcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0X3BhZ2luYXRpb24oKSB7XHJcbiAgICByZXR1cm4gcGFnaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdpbmF0aW9uJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9wYWdpbmF0aW9uKCkge1xyXG4gICAgcmV0dXJuIHBhZ2luYXRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldF91c2VyX2xpc3QoKSB7XHJcbiAgICByZXR1cm4gdXNlcl9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItbGlzdCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfdXNlcl9saXN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJfbGlzdDtcclxufVxyXG5cclxuc2V0X2Zvcm0oKTtcclxuc2V0X2Ftb3VudCgpO1xyXG5zZXRfaW5wdXQoKTtcclxuc2V0X3BhZ2luYXRpb24oKTtcclxuc2V0X3BhZ2luYXRpb25fY29udGFpbmVyKCk7XHJcbnNldF91c2VyX2xpc3QoKTtcclxuXHJcbi8q5riy5p+T55So5oi35YiX6KGoXHJcbiAqIEBwYXJhbSBBcnJheSBkYXRhIOeUqOS6jua4suafk+eahOaVsOaNrlxyXG4gKiAqL1xyXG5mdW5jdGlvbiByZW5kZXJfdXNyX2xpc3QoZGF0YSkge1xyXG5cclxuICAgIHZhciBodG1sID0gJyc7XHJcblxyXG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgaHRtbCA9IGh0bWwgKyBgXHJcbiAgICAgICA8ZGl2IGNsYXNzPVwidXNlclwiPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cImF2YXRhclwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke3VzZXIuaHRtbF91cmx9XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiJHt1c2VyLmF2YXRhcl91cmx9XCI+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VybmFtZVwiPiR7dXNlci5sb2dpbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdj48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt1c2VyLmh0bWxfdXJsfVwiPiR7dXNlci5odG1sX3VybH08L2E+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIHVzZXJfbGlzdC5pbm5lckhUTUwgPSBodG1sO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJfYW1vdW50KGRhdGEpIHtcclxuICAgIGFtb3VudC5pbm5lckhUTUwgPSBg5om+5YiwJHtkYXRhLnRvdGFsX2NvdW50feadoeaQnOe0oue7k+aenGA7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZ2V0X2Zvcm06IGdldF9mb3JtLFxyXG4gICAgZ2V0X2lucHV0OiBnZXRfaW5wdXQsXHJcbiAgICBnZXRfcGFnaW5hdGlvbjogZ2V0X3BhZ2luYXRpb24sXHJcbiAgICBnZXRfcGFnaW5hdGlvbl9jb250YWluZXI6IGdldF9wYWdpbmF0aW9uX2NvbnRhaW5lcixcclxuICAgIHJlbmRlcl91c3JfbGlzdDogcmVuZGVyX3Vzcl9saXN0LFxyXG4gICAgcmVuZGVyX2Ftb3VudDogcmVuZGVyX2Ftb3VudFxyXG59OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/element.js\n");

/***/ }),

/***/ "./js/event_manager.js":
/*!*****************************!*\
  !*** ./js/event_manager.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* 事件处理相关 */\r\n\r\nvar el = __webpack_require__(/*! ./element */ \"./js/element.js\"),\r\n    search = __webpack_require__(/*! ./search */ \"./js/search.js\"),\r\n    pagination = __webpack_require__(/*! ./pagination */ \"./js/pagination.js\"),\r\n    keyword;\r\n\r\n\r\nfunction set_keyword(val) {\r\n    return keyword = val;\r\n}\r\n\r\nfunction get_keyword() {\r\n    return keyword;\r\n}\r\n\r\n/* 监听表单提交事件 */\r\nfunction detect_submit() {\r\n    el.get_form().addEventListener('submit', function (e) {\r\n        e.preventDefault();\r\n\r\n        /* 获取搜索关键词 */\r\n        keyword = el.get_input().value;\r\n\r\n        if (!keyword) {\r\n            alert('药，药，切克闹~');\r\n            return;\r\n        }\r\n\r\n        /* 开始搜索 */\r\n        search.user(keyword, function (data) {\r\n            el.render_usr_list(data.items);\r\n            el.render_amount(data);\r\n            pagination.render_pagination();\r\n        });\r\n    });\r\n}\r\n\r\n/* 批量添加所有事件 */\r\nfunction add_events() {\r\n    detect_submit();\r\n}\r\n\r\nmodule.exports = {\r\n    set_keyword: set_keyword,\r\n    get_keyword: get_keyword,\r\n    detect_submit: detect_submit,\r\n    add_events: add_events\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9ldmVudF9tYW5hZ2VyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvZXZlbnRfbWFuYWdlci5qcz85NmRhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIOS6i+S7tuWkhOeQhuebuOWFsyAqL1xyXG5cclxudmFyIGVsID0gcmVxdWlyZSgnLi9lbGVtZW50JyksXHJcbiAgICBzZWFyY2ggPSByZXF1aXJlKCcuL3NlYXJjaCcpLFxyXG4gICAgcGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vcGFnaW5hdGlvbicpLFxyXG4gICAga2V5d29yZDtcclxuXHJcblxyXG5mdW5jdGlvbiBzZXRfa2V5d29yZCh2YWwpIHtcclxuICAgIHJldHVybiBrZXl3b3JkID0gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfa2V5d29yZCgpIHtcclxuICAgIHJldHVybiBrZXl3b3JkO1xyXG59XHJcblxyXG4vKiDnm5HlkKzooajljZXmj5DkuqTkuovku7YgKi9cclxuZnVuY3Rpb24gZGV0ZWN0X3N1Ym1pdCgpIHtcclxuICAgIGVsLmdldF9mb3JtKCkuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8qIOiOt+WPluaQnOe0ouWFs+mUruivjSAqL1xyXG4gICAgICAgIGtleXdvcmQgPSBlbC5nZXRfaW5wdXQoKS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFrZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfoja/vvIzoja/vvIzliIflhYvpl7l+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIOW8gOWni+aQnOe0oiAqL1xyXG4gICAgICAgIHNlYXJjaC51c2VyKGtleXdvcmQsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbmRlcl91c3JfbGlzdChkYXRhLml0ZW1zKTtcclxuICAgICAgICAgICAgZWwucmVuZGVyX2Ftb3VudChkYXRhKTtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbi5yZW5kZXJfcGFnaW5hdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qIOaJuemHj+a3u+WKoOaJgOacieS6i+S7tiAqL1xyXG5mdW5jdGlvbiBhZGRfZXZlbnRzKCkge1xyXG4gICAgZGV0ZWN0X3N1Ym1pdCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNldF9rZXl3b3JkOiBzZXRfa2V5d29yZCxcclxuICAgIGdldF9rZXl3b3JkOiBnZXRfa2V5d29yZCxcclxuICAgIGRldGVjdF9zdWJtaXQ6IGRldGVjdF9zdWJtaXQsXHJcbiAgICBhZGRfZXZlbnRzOiBhZGRfZXZlbnRzXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/event_manager.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* 入口文件 */\r\n\r\nvar event = __webpack_require__(/*! ./event_manager */ \"./js/event_manager.js\");\r\n\r\ninit();\r\n\r\nfunction init() {\r\n    event.add_events();\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsiLyog5YWl5Y+j5paH5Lu2ICovXHJcblxyXG52YXIgZXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50X21hbmFnZXInKTtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBldmVudC5hZGRfZXZlbnRzKCk7XHJcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/pagination.js":
/*!**************************!*\
  !*** ./js/pagination.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var el = __webpack_require__(/*! ./element */ \"./js/element.js\"),\r\n    send = __webpack_require__(/*! ./send */ \"./js/send.js\"),\r\n    search = __webpack_require__(/*! ./search */ \"./js/search.js\"),\r\n    event_manager = __webpack_require__(/*! ./event_manager */ \"./js/event_manager.js\"),\r\n    current_page = 1,\r\n    amount_page,\r\n    limit = 5,\r\n    max_btn_page = 5;\r\n\r\nfunction set_current_page(val) {\r\n    return current_page = val;\r\n}\r\n\r\nfunction get_current_page() {\r\n    return current_page;\r\n}\r\n\r\nfunction set_limit(val) {\r\n    return limit = val;\r\n}\r\n\r\nfunction get_limit() {\r\n    return limit;\r\n}\r\n\r\nfunction get_amount_page() {\r\n    console.log(send.get_amount(), get_limit());\r\n    \r\n    return amount_page = Math.ceil(send.get_amount() / get_limit());\r\n}\r\n\r\nfunction set_max_btn_page(val) {\r\n    return max_btn_page = val;\r\n}\r\n\r\nfunction get_max_btn_page() {\r\n    return max_btn_page;\r\n}\r\n\r\nfunction render_pagination() {\r\n    show_pagination();\r\n    clear_pagination();\r\n    get_current_page();\r\n    get_max_btn_page();\r\n    get_amount_page();\r\n\r\n    console.log(amount_page);\r\n    \r\n\r\n    var start,\r\n        middle = Math.ceil(max_btn_page / 2),\r\n        end;\r\n\r\n    var reaching_left = current_page < middle;\r\n    reaching_right = current_page > amount_page - middle;\r\n\r\n    if (reaching_left) {\r\n        start = 1;\r\n        end = max_btn_page;\r\n    } else if (reaching_right) {\r\n        start = amount_page - max_btn_page + 1;\r\n        end = amount_page;\r\n    } else {\r\n        start = current_page - middle + 1;\r\n        end = current_page + middle - 1;\r\n    }\r\n\r\n    if (start < 1) {\r\n        start = 1;\r\n    }\r\n\r\n    if (end > amount_page) {\r\n        end = amount_page;\r\n    }\r\n\r\n    for (var i = start; i <= end; i++) {\r\n        var num = i;\r\n        var btn = document.createElement('button');\r\n        btn.classList.add('pager');\r\n        btn.innerText = num;\r\n        el.get_pagination().appendChild(btn);\r\n\r\n        /* 给每一个button绑定事件 */\r\n        btn.addEventListener('click', click_btn(num));\r\n    }\r\n}\r\n\r\nfunction click_btn(page) {\r\n    return function () {\r\n        set_current_page(page);\r\n\r\n        /* @1 这里使用暴露出来的 event_manager.get_keywork() 方法无法得到 keyword，why? */\r\n        console.log('这里使用暴露出来的 event_manager.get_keywork() 方法无法得到 keyword，why?');\r\n        search.user(el.get_input().value, function (data) {\r\n            el.render_usr_list(data.items);\r\n            render_pagination();\r\n        }, {\r\n            current_page: current_page\r\n        });\r\n    };\r\n}\r\n\r\nfunction show_pagination() {\r\n    el.get_pagination_container().hidden = false;\r\n}\r\n\r\nfunction clear_pagination() {\r\n    el.get_pagination().innerHTML = '';\r\n}\r\n\r\nmodule.exports = {\r\n    render_pagination: render_pagination\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9wYWdpbmF0aW9uLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvcGFnaW5hdGlvbi5qcz9mNGJiIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBlbCA9IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxyXG4gICAgc2VuZCA9IHJlcXVpcmUoJy4vc2VuZCcpLFxyXG4gICAgc2VhcmNoID0gcmVxdWlyZSgnLi9zZWFyY2gnKSxcclxuICAgIGV2ZW50X21hbmFnZXIgPSByZXF1aXJlKCcuL2V2ZW50X21hbmFnZXInKSxcclxuICAgIGN1cnJlbnRfcGFnZSA9IDEsXHJcbiAgICBhbW91bnRfcGFnZSxcclxuICAgIGxpbWl0ID0gNSxcclxuICAgIG1heF9idG5fcGFnZSA9IDU7XHJcblxyXG5mdW5jdGlvbiBzZXRfY3VycmVudF9wYWdlKHZhbCkge1xyXG4gICAgcmV0dXJuIGN1cnJlbnRfcGFnZSA9IHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfcGFnZSgpIHtcclxuICAgIHJldHVybiBjdXJyZW50X3BhZ2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldF9saW1pdCh2YWwpIHtcclxuICAgIHJldHVybiBsaW1pdCA9IHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X2xpbWl0KCkge1xyXG4gICAgcmV0dXJuIGxpbWl0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfYW1vdW50X3BhZ2UoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhzZW5kLmdldF9hbW91bnQoKSwgZ2V0X2xpbWl0KCkpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYW1vdW50X3BhZ2UgPSBNYXRoLmNlaWwoc2VuZC5nZXRfYW1vdW50KCkgLyBnZXRfbGltaXQoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldF9tYXhfYnRuX3BhZ2UodmFsKSB7XHJcbiAgICByZXR1cm4gbWF4X2J0bl9wYWdlID0gdmFsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfbWF4X2J0bl9wYWdlKCkge1xyXG4gICAgcmV0dXJuIG1heF9idG5fcGFnZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyX3BhZ2luYXRpb24oKSB7XHJcbiAgICBzaG93X3BhZ2luYXRpb24oKTtcclxuICAgIGNsZWFyX3BhZ2luYXRpb24oKTtcclxuICAgIGdldF9jdXJyZW50X3BhZ2UoKTtcclxuICAgIGdldF9tYXhfYnRuX3BhZ2UoKTtcclxuICAgIGdldF9hbW91bnRfcGFnZSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGFtb3VudF9wYWdlKTtcclxuICAgIFxyXG5cclxuICAgIHZhciBzdGFydCxcclxuICAgICAgICBtaWRkbGUgPSBNYXRoLmNlaWwobWF4X2J0bl9wYWdlIC8gMiksXHJcbiAgICAgICAgZW5kO1xyXG5cclxuICAgIHZhciByZWFjaGluZ19sZWZ0ID0gY3VycmVudF9wYWdlIDwgbWlkZGxlO1xyXG4gICAgcmVhY2hpbmdfcmlnaHQgPSBjdXJyZW50X3BhZ2UgPiBhbW91bnRfcGFnZSAtIG1pZGRsZTtcclxuXHJcbiAgICBpZiAocmVhY2hpbmdfbGVmdCkge1xyXG4gICAgICAgIHN0YXJ0ID0gMTtcclxuICAgICAgICBlbmQgPSBtYXhfYnRuX3BhZ2U7XHJcbiAgICB9IGVsc2UgaWYgKHJlYWNoaW5nX3JpZ2h0KSB7XHJcbiAgICAgICAgc3RhcnQgPSBhbW91bnRfcGFnZSAtIG1heF9idG5fcGFnZSArIDE7XHJcbiAgICAgICAgZW5kID0gYW1vdW50X3BhZ2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXJ0ID0gY3VycmVudF9wYWdlIC0gbWlkZGxlICsgMTtcclxuICAgICAgICBlbmQgPSBjdXJyZW50X3BhZ2UgKyBtaWRkbGUgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydCA8IDEpIHtcclxuICAgICAgICBzdGFydCA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVuZCA+IGFtb3VudF9wYWdlKSB7XHJcbiAgICAgICAgZW5kID0gYW1vdW50X3BhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG51bSA9IGk7XHJcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdwYWdlcicpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBudW07XHJcbiAgICAgICAgZWwuZ2V0X3BhZ2luYXRpb24oKS5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgICAgICAvKiDnu5nmr4/kuIDkuKpidXR0b27nu5Hlrprkuovku7YgKi9cclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja19idG4obnVtKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsaWNrX2J0bihwYWdlKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldF9jdXJyZW50X3BhZ2UocGFnZSk7XHJcblxyXG4gICAgICAgIC8qIEAxIOi/memHjOS9v+eUqOaatOmcsuWHuuadpeeahCBldmVudF9tYW5hZ2VyLmdldF9rZXl3b3JrKCkg5pa55rOV5peg5rOV5b6X5YiwIGtleXdvcmTvvIx3aHk/ICovXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+i/memHjOS9v+eUqOaatOmcsuWHuuadpeeahCBldmVudF9tYW5hZ2VyLmdldF9rZXl3b3JrKCkg5pa55rOV5peg5rOV5b6X5YiwIGtleXdvcmTvvIx3aHk/Jyk7XHJcbiAgICAgICAgc2VhcmNoLnVzZXIoZWwuZ2V0X2lucHV0KCkudmFsdWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbmRlcl91c3JfbGlzdChkYXRhLml0ZW1zKTtcclxuICAgICAgICAgICAgcmVuZGVyX3BhZ2luYXRpb24oKTtcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfcGFnZTogY3VycmVudF9wYWdlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X3BhZ2luYXRpb24oKSB7XHJcbiAgICBlbC5nZXRfcGFnaW5hdGlvbl9jb250YWluZXIoKS5oaWRkZW4gPSBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJfcGFnaW5hdGlvbigpIHtcclxuICAgIGVsLmdldF9wYWdpbmF0aW9uKCkuaW5uZXJIVE1MID0gJyc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVuZGVyX3BhZ2luYXRpb246IHJlbmRlcl9wYWdpbmF0aW9uXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/pagination.js\n");

/***/ }),

/***/ "./js/search.js":
/*!**********************!*\
  !*** ./js/search.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*搜索模块\r\n * user: 获取github用户数据。具体这个数据用来干嘛，我不在乎，由调用者\r\n * 决定*/\r\n\r\n/*搜用户\r\n * @param String keyword 用户名关键词\r\n * @param Function on_success 当搜到数据时怎么办（回调函数）\r\n * @param Object config 配置项\r\n * */\r\n\r\nvar send = __webpack_require__(/*! ./send */ \"./js/send.js\");\r\n\r\nfunction user(keyword, on_success, config) {\r\n    /* 默认配置 */\r\n    var def = {\r\n        current_page: 1,\r\n        limit: 10\r\n    };\r\n\r\n    /* 合并用户配置 */\r\n    config = Object.assign({}, def, config);\r\n\r\n    send.send('https://api.github.com/search/users?q=' + keyword + '&page=' + config.current_page + '&per_page=' + config.limit, on_success);\r\n}\r\n\r\nmodule.exports = {\r\n    user: user,\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZWFyY2guanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2guanM/ODAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKuaQnOe0ouaooeWdl1xyXG4gKiB1c2VyOiDojrflj5ZnaXRodWLnlKjmiLfmlbDmja7jgILlhbfkvZPov5nkuKrmlbDmja7nlKjmnaXlubLlmJvvvIzmiJHkuI3lnKjkuY7vvIznlLHosIPnlKjogIVcclxuICog5Yaz5a6aKi9cclxuXHJcbi8q5pCc55So5oi3XHJcbiAqIEBwYXJhbSBTdHJpbmcga2V5d29yZCDnlKjmiLflkI3lhbPplK7or41cclxuICogQHBhcmFtIEZ1bmN0aW9uIG9uX3N1Y2Nlc3Mg5b2T5pCc5Yiw5pWw5o2u5pe25oCO5LmI5Yqe77yI5Zue6LCD5Ye95pWw77yJXHJcbiAqIEBwYXJhbSBPYmplY3QgY29uZmlnIOmFjee9rumhuVxyXG4gKiAqL1xyXG5cclxudmFyIHNlbmQgPSByZXF1aXJlKCcuL3NlbmQnKTtcclxuXHJcbmZ1bmN0aW9uIHVzZXIoa2V5d29yZCwgb25fc3VjY2VzcywgY29uZmlnKSB7XHJcbiAgICAvKiDpu5jorqTphY3nva4gKi9cclxuICAgIHZhciBkZWYgPSB7XHJcbiAgICAgICAgY3VycmVudF9wYWdlOiAxLFxyXG4gICAgICAgIGxpbWl0OiAxMFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiDlkIjlubbnlKjmiLfphY3nva4gKi9cclxuICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZiwgY29uZmlnKTtcclxuXHJcbiAgICBzZW5kLnNlbmQoJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL3VzZXJzP3E9JyArIGtleXdvcmQgKyAnJnBhZ2U9JyArIGNvbmZpZy5jdXJyZW50X3BhZ2UgKyAnJnBlcl9wYWdlPScgKyBjb25maWcubGltaXQsIG9uX3N1Y2Nlc3MpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHVzZXI6IHVzZXIsXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/search.js\n");

/***/ }),

/***/ "./js/send.js":
/*!********************!*\
  !*** ./js/send.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var amount;\r\n\r\nfunction send(url, on_success, method) {\r\n    method = method || 'get'\r\n    var http = new XMLHttpRequest();\r\n    http.open(method, url);\r\n    http.send();\r\n\r\n    http.addEventListener('load', function () {\r\n        var res = JSON.parse(this.responseText);\r\n        amount = res.total_count;\r\n        on_success(res);\r\n    });\r\n}\r\n\r\nfunction get_amount() {\r\n    return amount;\r\n}\r\n\r\nmodule.exports = {\r\n    get_amount: get_amount,\r\n    send: send\r\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zZW5kLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvc2VuZC5qcz8zNWZlIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBhbW91bnQ7XHJcblxyXG5mdW5jdGlvbiBzZW5kKHVybCwgb25fc3VjY2VzcywgbWV0aG9kKSB7XHJcbiAgICBtZXRob2QgPSBtZXRob2QgfHwgJ2dldCdcclxuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBodHRwLm9wZW4obWV0aG9kLCB1cmwpO1xyXG4gICAgaHR0cC5zZW5kKCk7XHJcblxyXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZXMgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBhbW91bnQgPSByZXMudG90YWxfY291bnQ7XHJcbiAgICAgICAgb25fc3VjY2VzcyhyZXMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9hbW91bnQoKSB7XHJcbiAgICByZXR1cm4gYW1vdW50O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGdldF9hbW91bnQ6IGdldF9hbW91bnQsXHJcbiAgICBzZW5kOiBzZW5kXHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/send.js\n");

/***/ })

/******/ });