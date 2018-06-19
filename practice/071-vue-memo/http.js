window.http = {
    post: function (url, data) {
        data = data || {};

        data.app_key = '18d9afd756f37eb9a962df5f52a4353937be8a55dbd3aa2902386009f259a5c2';
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