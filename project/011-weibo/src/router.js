import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Person from './views/Person.vue'
import Mine from './views/Mine.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})