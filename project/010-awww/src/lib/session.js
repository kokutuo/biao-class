import api from './api';

export default {
  /**
   * 检验账户与密码是否匹配
   * @param {string} unique 用户的登录账户
   * @param {string} password 登录密码
   */
  exist(unique, password) {
    return api('user/read', {
      where: {
        or: [
          ['username', '=', unique],
          ['phone', '=', unique],
          ['email', '=', unique],
        ]
      }
    }).then(r => {
      let row;

      if ((row = r.data[0]) && row.password == password) {
        return row;
      }

      return false;
    })
  },

  /**
   * 取出并解析localStorage中存储的用户信息
   */
  uinfo() {
    return JSON.parse(localStorage.getItem('uinfo')) || {};
  },

  login(row) {
    this.replace_uinfo(row);
  },

  replace_uinfo(row) {
    delete row.password;
    localStorage.setItem('uinfo', JSON.stringify(row));
  },

  logout(url) {
    localStorage.removeItem('uinfo');
    location.href = url || '/';
  },

  /**
   * 判断是否为管理员
   */
  is_admin() {
    let info = this.uinfo();
    return info && this.uinfo().is_admin;
  },

  /**
   * 是否已登录
   */
  logged_in() {
    return !!this.his_id();
  },

  /**
   * 获取已登录用户的id
   */
  his_id() {
    let info = this.uinfo();
    return info && this.uinfo().id;
  }
}