import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Error404 from './components/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home',
      component: Home,
      meta: { Auth: false, title: 'Inicio'}
    },
    { path: '/register', name: 'register', 
      component: () => import('./components/Register'),
      meta: { Auth: false, title: 'Registro'}
    },
    { path: '/login', name: 'login', 
      component: () => import('./components/Login'),
      meta: { Auth: false, title: 'Registro'}
    },
    {path: '*',component: Error404}
  ]
})
