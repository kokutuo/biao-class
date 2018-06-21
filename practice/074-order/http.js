window.http = {
    post: function (url, data) {
        data = data || {};

        data.app_key = '40938db5c0fbcaf95961235092ff5287fc186d53f3f54b89321c5e24e7723792';
        data.timestamp = (new Date).getTime();
        data.signature = this.sign(data.app_key, data.timestamp);

        return axios
            .post('http://mock.biaoyansu.com/api/' + url, data);
    },

    sign: function (app_key, timestamp) {
        return btoa(app_key + timestamp);
    },
};