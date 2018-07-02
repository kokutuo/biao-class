import "normalize.css"
import "./main.css"

import Vue from 'vue'
import Root from './Root.vue'
import Router from 'vue-router';

import Home from './page/Home.vue';
import Signup from './page/Signup.vue';
import Login from './page/Login.vue';
import AdminBase from './page/admin/Base.vue';
import User from './page/admin/User.vue';
import Vehicle from './page/admin/Vehicle.vue';
import Brand from './page/admin/Brand.vue';

Vue.use(Router);

Vue.config.productionTip = false;

const router = new Router({
    routes: [
        {path: '/', component: Home},
        {path: '/signup', component: Signup},
        {path: '/login', component: Login},
        {
            path: '/admin',
            component: AdminBase,
            children: [
                {path: 'user', component: User},
                {path: 'vehicle', component: Vehicle},
                {path: 'brand', component: Brand}
            ]
        },
    ]
})

new Vue({
  render: h => h(Root),
  router: router,
}).$mount('#root');
