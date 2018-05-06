/*搜索模块
 * user: 获取github用户数据。具体这个数据用来干嘛，我不在乎，由调用者
 * 决定*/

/*搜用户
 * @param String keyword 用户名关键词
 * @param Function on_success 当搜到数据时怎么办（回调函数）
 * @param Object config 配置项
 * */

var send = require('./send');

function user(keyword, on_success, config) {
    /* 默认配置 */
    var def = {
        current_page: 1,
        limit: 10,
    };

    /* 合并用户配置 */
    config = Object.assign({}, def, config);

    send.send('https://api.github.com/search/users?q=' + keyword + '&page=' + config.current_page + '&per_page=' + config.limit, on_success);
}

module.exports = {
    user: user,
};