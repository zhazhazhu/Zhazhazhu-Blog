import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw ={
  path: '/login',
  name: 'Login',
  component: () => import('/@/view/login/index.vue'),
  meta: {
    keepAlive: true
  }
}

export default loginRoutes