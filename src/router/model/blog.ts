import { RouteRecordRaw } from 'vue-router';

const BlogRoutes: RouteRecordRaw[] = [
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('/@/view/home/components/Blog.vue')
  },
  {
    path: '/writeBlog',
    name: 'WriteBlog',
    component: () => import('/@/view/home/components/WriteBlog.vue')
  },
  {
    path: '/uploadPhoto',
    name: 'UploadPhoto',
    component: () => import('/@/view/photo/components/UploadPhoto.vue')
  }
]

export default BlogRoutes