import { RouteRecordRaw } from 'vue-router';

const blogRoutes: RouteRecordRaw ={
  path: '/',
  name: 'TabBar',
  component: () => import('/@/layout/index.vue'),
  redirect: 'login',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('/@/view/home/home.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/file',
      name: 'File',
      component: () => import('/@/view/file/file.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import('/@/view/photo/index.vue'),
      meta: {
        keepAlive: true
      }
    }
  ]
}

export default blogRoutes