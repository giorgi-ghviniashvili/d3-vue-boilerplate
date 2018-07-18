import Vue from 'vue'
import VueD3 from 'vue-d3'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(VueD3)
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
