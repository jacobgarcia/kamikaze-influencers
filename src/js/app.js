import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './containers/App.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')
