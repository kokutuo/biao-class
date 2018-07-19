import "normalize.css"
import "./main.css"

import Vue from 'vue'
import Root from './Root.vue'
import Router from 'vue-router';

import session from './lib/session';

import Focus from './directive/focus';

import Home from './page/Home.vue';
import Signup from './page/Signup.vue';
import Login from './page/Login.vue';
import Detail from './page/Detail.vue';
import Search from './page/Search.vue';
import AdminBase from './page/admin/Base.vue';
import User from './page/admin/User.vue';
import Vehicle from './page/admin/Vehicle.vue';
import Brand from './page/admin/Brand.vue';
import Model from './page/admin/Model.vue';
import Design from './page/admin/Design.vue';
import Location from './page/admin/Location.vue';
import Report from './page/admin/Report.vue';
import Appo from './page/admin/Appo.vue';

Vue.use(Router);

Vue.config.productionTip = false;

Vue.filter('only_day', function (val) {
  if (!val) {
    return val;
  }

  return val.split(' ')[0];
});

Vue.filter('percentage', function (val) {
  if (!val) {
    return;
  }

  return (val * 100).toFixed(2) + '%';
});

const router = new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/admin',
      component: AdminBase,
      children: [{
          path: 'user',
          component: User
        },
        {
          path: 'vehicle',
          component: Vehicle
        },
        {
          path: 'brand',
          component: Brand
        },
        {
          path: 'model',
          component: Model
        },
        {
          path: 'design',
          component: Design
        },
        {
          path: 'location',
          component: Location
        },
        {
          path: 'report',
          component: Report
        },
        {
          path: 'appo',
          component: Appo
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  let go_admin = to.fullPath.startsWith('/admin/');

  if (go_admin && !session.is_admin()) {
    alert('请先使用管理员账号登录，用户名：admin，密码：yoyoyo');
    next('/login');
  } else {
    next();
  }
});

new Vue({
  directives: {
    Focus
  },
  render: h => h(Root),
  router: router,
}).$mount('#root');