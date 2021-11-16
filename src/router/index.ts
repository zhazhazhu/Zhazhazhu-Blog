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
        component: () => import('../view/home/home.vue')
      },
      {
        path: '/file',
        name: 'File',
        component: () => import('../view/file/file.vue')
      },
      {
        path: '/photo',
        name: 'Photo',
        component: () => import('../view/photo/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

