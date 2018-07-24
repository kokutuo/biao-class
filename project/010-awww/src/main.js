import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'

import Home from './page/Home.vue';
import Detail from './page/Detail.vue';
import Search from './page/Search.vue';

import './css/global.css';

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/detail', component: Detail},
    {path: '/search', component: Search},
  ],
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
