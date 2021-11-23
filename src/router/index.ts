import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MenuRoutes from './model';
import loginRoutes from './model/login';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TabBar',
    component: () => import('/@/layout/index.vue'),
    redirect: 'login',
    children: [...MenuRoutes]
  },
  ...loginRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

