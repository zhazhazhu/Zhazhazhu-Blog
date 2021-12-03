import { RouteRecordRaw } from 'vue-router';

const MenuRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('/@/view/home/home.vue'),
    meta: {
      Icon: 'house_siding',
      Menu: '首页',
      keepAlive: true
    },
  },
  {
    path: '/file',
    name: 'File',
    component: () => import('/@/view/file/file.vue'),
    meta: {
      Icon: 'folder_open',
      Menu: '归档',
      keepAlive: true
    }
  },
  {
    path: '/fun',
    name: 'Fun',
    component: () => import('/@/view/photo/index.vue'),
    meta: {
      Icon: 'data_saver_off',
      Menu: '趣事',
      keepAlive: true
    }
  },
  {
    path: '/photo',
    name: 'Photo',
    component: () => import('/@/view/photo/index.vue'),
    meta: {
      Icon: 'crop_original',
      Menu: '相册',
      keepAlive: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('/@/view/user/index.vue'),
    meta: {
      Icon: 'scatter_plot',
      Menu: '我的',
      keepAlive: true
    }
  }
]

export default MenuRoutes