export default {
  uinfo() {
    return JSON.parse(localStorage.getItem('uinfo'));
  },

  login(row) {
    localStorage.setItem('uinfo', JSON.stringify(row));
  },

  logout(url) {
    localStorage.removeItem('uinfo');
    location.href = url || '/';
  }
};