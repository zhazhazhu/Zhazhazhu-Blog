import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MenuRoutes from './model';
import loginRoutes from './model/login';
import BlogRoutes from './model/blog';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TabBar',
    component: () => import('/@/layout/index.vue'),
    redirect: 'login',
    children: [...MenuRoutes, ...BlogRoutes]
  },
  ...loginRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

