import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TabBar',
    component: () => import('/@/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('/@/view/home.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

