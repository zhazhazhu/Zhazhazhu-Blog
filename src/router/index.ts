import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tabBar',
    component: () => import('/@/layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

