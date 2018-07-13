import "normalize.css"
import "./main.css"

import Vue from 'vue'
import Root from './Root.vue'
import Router from 'vue-router';

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

  return val.toFixed(2) * 100 + '%';
})

const router = new Router({
    routes: [
        {path: '/', component: Home},
        {path: '/signup', component: Signup},
        {path: '/login', component: Login},
        {path: '/detail/:id', component: Detail},
        {path: '/search', component: Search},
        {
            path: '/admin',
            component: AdminBase,
            children: [
                {path: 'user', component: User},
                {path: 'vehicle', component: Vehicle},
                {path: 'brand', component: Brand},
                {path: 'model', component: Model},
                {path: 'design', component: Design},
                {path: 'location', component: Location},
                {path: 'report', component: Report},
            ]
        },
    ]
})

new Vue({
  render: h => h(Root),
  router: router,
}).$mount('#root');
