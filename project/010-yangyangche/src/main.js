import "normalize.css"
import "./main.css"

import Vue from 'vue'
import Root from './Root.vue'
import Router from 'vue-router';

import Home from './page/Home.vue';
import Signup from './page/Signup.vue';
import Login from './page/Login.vue';
import Detail from './page/Detail.vue';
import SearchResult from './page/SearchResult.vue';
import AdminBase from './page/admin/Base.vue';
import User from './page/admin/User.vue';
import Vehicle from './page/admin/Vehicle.vue';
import Brand from './page/admin/Brand.vue';
import Model from './page/admin/Model.vue';
import Design from './page/admin/Design.vue';
import Location from './page/admin/Location.vue';

Vue.use(Router);

Vue.config.productionTip = false;

const router = new Router({
    routes: [
        {path: '/', component: Home},
        {path: '/signup', component: Signup},
        {path: '/login', component: Login},
        {path: '/detail', component: Detail},
        {path: '/search-result', component: SearchResult},
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
            ]
        },
    ]
})

new Vue({
  render: h => h(Root),
  router: router,
}).$mount('#root');
