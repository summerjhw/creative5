import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import MyPets from './views/MyPets.vue'
import Pet from './views/Pet.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/mypets',
      name:'MyPets',
      component: MyPets,
    },
    {
      path: '/pet/:id',
      name: 'pet',
      component: Pet
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
