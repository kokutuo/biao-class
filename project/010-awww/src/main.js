import 'normalize.css';
import './css/global.css';
import 'swiper/dist/css/swiper.css';

import Vue from 'vue'
import Router from 'vue-router';
import Validate from 'vee-validate';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App.vue'
import Home from './page/Home.vue';
import Detail from './page/Detail.vue';
import Search from './page/Search.vue';
import NewOrder from './page/NewOrder.vue';
import Pay from './page/Pay.vue';
import Login from './page/Login.vue';
import Signup from './page/Signup.vue';

import Me from './page/me/Me.vue';
import Setting from './page/me/Setting.vue';
import MyOrder from './page/me/MyOrder.vue';

import Admin from './page/admin/Base.vue';
import Category from './page/admin/Category.vue';
import User from './page/admin/User.vue';
import Pet from './page/admin/Pet.vue';
import Order from './page/admin/Order.vue';
import Breed from './page/admin/Breed.vue';

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(VueAwesomeSwiper);
Vue.use(Validate, {
  local: 'zh_CN'
});

// Validator.extend('exist', {
//   validate   : () => {
//     return api('')
//   },
//   getMessage : (field, params, data) => data.message,
// });

const router = new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
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
      path: '/new_order',
      component: NewOrder
    },
    {
      path: '/pay/:oid',
      component: Pay
    },
    {
      path: '/me',
      component: Me,
      children: [{
          path: 'setting',
          component: Setting
        },
        {
          path: 'order',
          component: MyOrder
        }
      ]
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