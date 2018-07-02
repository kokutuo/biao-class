window.api = api;

const APP_KEY = 'b766bc75ea6969373616aa2ff698e3572792d7ed6e7d4ae2dd3c95cc0f3f7578';
const BASE_API = 'http://mock.biaoyansu.com/api/';

function sign(app_key, timestamp) {
    return btoa(app_key + timestamp);
}

function api(url, params) {
    let timestamp = (new Date).getTime();
    let signature = sign(APP_KEY, timestamp);

    let option = {
        headers: {
            'biao-mock-app-key': APP_KEY,
            'biao-mock-timestamp': timestamp,
            'biao-mock-signature': signature
        },
    };

    url = BASE_API + url;
    return axios
        .post(url, params, option);
    // .then(r => {
    //     return r.data
    // })
}