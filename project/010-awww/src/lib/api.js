import axios from 'axios';

const APP_KEY = 'd979d9f2826e114ff0d9d4cef55ade0b78426086d8480c641dd752fd237bd2cf';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';

function sign(app_key, timestamp) {
  return btoa(app_key + timestamp);
}

export default function api(url, params) {
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