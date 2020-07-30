import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'templatePage',
    component: () => import('@/views/templatePage/index.vue')
  },
  {
    path: '/pageView/:pageId',
    name: 'pageView',
    component: () => import('@/views/pageView/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
