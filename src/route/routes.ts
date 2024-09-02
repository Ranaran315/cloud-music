import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/profile.vue'),
    meta: {
      title: '个人中心',
    },
  },
]

export default routes
