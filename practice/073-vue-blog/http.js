window.http = {
    post: function (url, data) {
        data = data || {};

        data.app_key = 'd4989d4adebf4f489ee6eeda2b78588b6a0ef2c6dab81bd2fe9fda673c33199a';
        data.timestamp = (new Date).getTime();
        data.signature = this.sign(data.app_key, data.timestamp);

        return axios
            .post('http://mock.biaoyansu.com/api/' + url, data)
            .then(function (res) {
                return res;
            });
    },

    sign: function (app_key, timestamp) {
        return btoa(app_key + timestamp);
    },
};