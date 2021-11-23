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
    path: '/photo',
    name: 'Photo',
    component: () => import('/@/view/photo/index.vue'),
    meta: {
      Icon: 'crop_original',
      Menu: '相册',
      keepAlive: true
    }
  }
]

export default MenuRoutes