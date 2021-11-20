import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import blogRoutes from './model/blog';
import loginRoutes from './model/login';

const routes: RouteRecordRaw[] = [blogRoutes, ...loginRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

