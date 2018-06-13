/**
 * 通过'.'分割的键名来获取多级对象
 * getObj({a: {b: 1}}, 'a.b') => 1
 * 
 * @param {object} data eg: {a: {b: 1}} 
 * @param key eg: 'a.b' 
 * @return eg: '1'
 */
function getObj(data, key) {
    // 将对象拷一份
    // 否则有可能污染外部的对象(因为对象是引用类型, 也就是'借'值)
    let result = Object.assign({}, data);

    // 将键通过点分割为数组
    // 'a.b' => [a, b]
    let layers = key.split('.');

    // 循环这个数组，每一次就是深入一级
    layers.forEach(key => {
        // 当前对象覆盖前一级对象
        result = result[key];
    });

    // 返回最后取到的值
    return result;
}

/**
 * 解析模板
 * @param {string} tpl 需要解析的模板, eg: "我叫{{user.name}}, 我今年{{use.age}}岁了"
 * @param {object} data 需要插入的数据, eg: {user: {name: '李拴蛋', age: '18'}} 
 * @return {string} "我叫李拴蛋, 我今年18岁了"
 */
function parse(tpl, data) {
    // 定义正则，要求：
    // - 必须匹配双花括号中的内容，
    // - 双花括号与内容之间可以有空格
    const re = /{{([^}]+)}}/g;

    // 声明match, 方便下方的循环缓存过程值, 也就是[0: "{{user.name}}", 1: "user.name", ...]
    // 这个值每次循环都不一样, 如果找不到匹配就为null
    // 一旦出现null则循环停止
    let match;

    // 将模板拷一份，方便后续处理(防止因为替换导致字符串长度不一致的问题)
    let result = tpl;

    // exec() 方法用于匹配字符串, 但是其特点是一拨一转
    // 叫他一次，他才会匹配下一条，直到再也找不到匹配结果（返回 null）
    while (match = re.exec(tpl)) {
        // 获取花括号, 如 '{{user.name}}'
        let variable = match[0];
        
        // 获取键名, 如 'user.name'
        let key = match[1].trim();

        // 获取键名背后的数据, 如 '王花花'
        let replacement = getObj(data, key);
        
        if(replacement === 'undefined'){
            continue;
        }

        // 将模板中的变量(花括号)替换成数据
        result = result.replace(variable, replacement);
    }

    return result;
}

// let tpl = '我叫{{user.name}}, 我今年{{use.age}}岁了';
// let data = {
//     user: {
//         name: '李拴蛋',
//         age: '18'
//     }
// };

// let r = parse(tpl, data);
// console.log(r);

window.parse = parse;