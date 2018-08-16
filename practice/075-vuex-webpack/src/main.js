import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    data: '',
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementAsync({
      commit
    }) {
      setTimeout(() => {
        commit('increment');
      }, 500);
    },

    getData({
      state
    }) {
      fetch('http://mock.biaoyansu.com//api/1/@util/mock?mocker=colorName').then(r => r = r.json()).then(r => state.data = r);
    }
  }
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')