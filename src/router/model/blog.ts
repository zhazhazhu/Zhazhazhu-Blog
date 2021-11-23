import { RouteRecordRaw } from 'vue-router';

const BlogRoutes: RouteRecordRaw[] = [
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('/@/view/home/components/Blog.vue')
  }
]

export default BlogRoutes