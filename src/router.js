import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Error404 from './components/404.vue'

Vue.use(Router)

import store from '@/store'

const beforeEnter = (to, from, next) => {
  if ( store.state.authModule.logged ) {
    next ( {path: '/'} )
  } else {
    next ( )
  }
}

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home',
      component: Home,
      meta: { Auth: false, title: 'Inicio'}
    },
    { path: '/register', name: 'register', 
      component: () => import('./components/Register'),
      meta: { Auth: false, title: 'Registro'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    { path: '/login', name: 'login', 
      component: () => import('./components/Login'),
      meta: { Auth: false, title: 'Ingresar'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    { path: '/admin', name: 'admin', 
      component: () => import('./components/administrations/AdminHome'),
      meta: { Auth: true, title: 'Administracion', role: 'admin' },
      children: [
        {
          path: '/admin/users',
          component: () => import('./components/administrations/AdminUsers'),
          meta: { title: 'Administrar Usuarios'}
        },
        {
          path: '/admin/products',
          component: () => import('./components/administrations/AdminProducts'),
          meta: { title: 'Administrar Productos'}
        }
      ]
    },
    {path: '*',component: Error404}
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    if ( to.meta.Auth && !store.state.authModule.logged && store.state.loaded ) {
        next( { path: '/login' } )
    } else {
        if (to.meta.role) {
            if ( store.state.loaded &&  ( to.meta.role !== store.state.authModule.role ) ) {
                next( {path: '/'} )
                return
            }
        }
        next()
    }
})

export default router
