import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "./components/Index.vue"
import App from "./components/App.vue"

Vue.use(VueRouter)

export const router = new VueRouter({
  history: true
})

router.map({
  '/': {
    component: Index
  }
})

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/'
})

// Start the app on the #app div
router.start(App, '#app')
