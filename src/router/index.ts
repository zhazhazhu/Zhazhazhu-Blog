import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TabBar',
    component: () => import('/@/layout/index.vue'),
    redirect:'/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('/@/view/home.vue')
      },
      {
        path: '/file',
        name: 'File',
        component: () => import('/@/view/file.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

