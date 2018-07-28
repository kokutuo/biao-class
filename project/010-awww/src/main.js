import 'normalize.css';
import './css/global.css';

import Vue from 'vue'
import Router from 'vue-router';
import App from './App.vue'

import Home from './page/Home.vue';
import Detail from './page/Detail.vue';
import Search from './page/Search.vue';

import Admin from './page/admin/Base.vue';
import Category from './page/admin/Category.vue';
import User from './page/admin/User.vue';
import Pet from './page/admin/Pet.vue';
import Order from './page/admin/Order.vue';
import Breed from './page/admin/Breed.vue';

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
        path: 'category',
        component: Category,
      }, {
        path: 'user',
        component: User,
      }, {
        path: 'pet',
        component: Pet,
      }, {
        path: 'order',
        component: Order,
      }, {
        path: 'breed',
        component: Breed,
      }]
    }
  ],
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')