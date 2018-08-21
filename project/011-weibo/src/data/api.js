window.api = api;

const APP_KEY = 'd8e757b6b3be4bb0da1e2bbe67f65080920d50fbd954fd8a34ea97d81596a2a9';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';

function sign(app_key, timestamp) {
  return btoa(app_key + timestamp);
}

function api(url, params) {
  let timestamp = (new Date).getTime();
  let signature = sign(APP_KEY, timestamp);

  let option = {
    headers: {
      'BIAO-MOCK-APP-KEY': APP_KEY,
      'BIAO-MOCK-TIMESTAMP': timestamp,
      'BIAO-MOCK-SIGNATURE': signature
    },
  };

  url = BASE_API + url;
  return axios
    .post(url, params, option)
    .then(r => {
      return r.data
    });
}