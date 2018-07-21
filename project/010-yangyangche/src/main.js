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
import Publish from './page/Publish';

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
      component: Home,
      meta: {
        title: '首页-洋洋车'
      }
    },
    {
      path: '/signup',
      component: Signup,
      meta: {
        title: '注册-洋洋车'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录-洋洋车'
      }
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: {
        title: '二手车详情-洋洋车'
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        title: '搜索-洋洋车'
      }
    },
    {
      path: '/publish',
      component: Publish,
      meta: {
        title: '发布二手车-洋洋车'
      }
    },
    {
      path: '/admin',
      component: AdminBase,
      children: [{
          path: 'user',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: User
        },
        {
          path: 'vehicle',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Vehicle
        },
        {
          path: 'brand',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Brand
        },
        {
          path: 'model',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Model
        },
        {
          path: 'design',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Design
        },
        {
          path: 'location',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Location
        },
        {
          path: 'report',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Report
        },
        {
          path: 'appo',
          meta: {
            title: '管理面板-洋洋车'
          },
          component: Appo
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  let go_admin = to.fullPath.startsWith('/admin/');
  // let go_publish = to.fullPath.startsWith('/publish');

  // if (go_publish && !session.logged_in()) {
  //   alert('请先登录，如果没有账号请先注册；管理员账号如下，用户名：admin，密码：yoyoyo');
  //   next('/login');
  // }

  if (go_admin && !session.is_admin()) {
    alert('请先使用管理员账号登录，用户名：admin，密码：yoyoyo');
    next('/login');
    return;
  } else {
    next();
  }

  document.title = to.meta.title;
});

new Vue({
  directives: {
    Focus
  },
  render: h => h(Root),
  router: router,
}).$mount('#root');