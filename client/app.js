import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App.vue'
import Product from './pages/Product.vue'
import Products from './pages/Products.vue'
import Cart from './pages/Cart.vue'
import Login from './pages/Login.vue'

import cartModule from './store/cart'
import authModule from './store/auth'

import './app.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      { path: '/', component: Products },
      { path: '/products/:id', component: Product },
      { path: '/cart', component: Cart },
      { path: '/login', component: Login }
    ]
  }),
  store: new Vuex.Store({
    modules: {
      cart: cartModule,
      auth: authModule
    }
  }),
  render (createElement) {
    return createElement(App)
  }
})
