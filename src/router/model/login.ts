import { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/view/login/index.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('/@/view/register/index.vue'),
    meta: {
      keepAlive: true
    }
  }
]

export default loginRoutes