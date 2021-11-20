import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import blogRoutes from './model/blog';
import loginRoutes from './model/login';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TabBar',
    component: () => import('/@/layout/index.vue'),
    redirect: 'login',
    children: [...blogRoutes, ...loginRoutes]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

