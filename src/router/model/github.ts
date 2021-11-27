import { RouteRecordRaw } from 'vue-router'


const githubRoutes: RouteRecordRaw[] = [
  {
    path: '/github/callback',
    name: 'callback',
    component: () => import('/@/components/github/Callback.vue'),
  }
]

export default githubRoutes