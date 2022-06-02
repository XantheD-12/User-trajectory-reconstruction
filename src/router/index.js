import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/MapContainer.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('../views/Charts.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
