import { RouteRecordRaw } from 'vue-router'
import {
  Home,
  Like,
  Podcast,
  Music,
  Download,
  Collect,
  Wander,
  Community,
  Cloud,
  Dir,
  Recent,
  User,
} from '@/icons'

export const sidebarRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '首页',
          icon: Home,
        },
      },
      {
        path: '/cloudmusic',
        name: 'CloudMusic',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '云音乐精选',
          icon: Music,
        },
      },
      {
        path: '/podcast',
        name: 'Podcast',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '播客',
          icon: Podcast,
        },
      },
      {
        path: '/wander',
        name: 'Wander',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '私人漫游',
          icon: Wander,
        },
      },
      {
        path: '/community',
        name: 'Community',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '社区',
          icon: Community,
        },
      },
    ],
  },
  {
    path: '/my',
    redirect: '/my/music',
    meta: {
      title: '我的',
    },
    children: [
      {
        path: '/my/likedmusic',
        name: 'MyLikedMusic',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '我喜欢的音乐',
          icon: Like,
        },
      },
      {
        path: '/my/collect',
        name: 'MyCollect',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '我的收藏',
          icon: Collect,
        },
      },
      {
        path: '/download',
        name: 'Download',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '下载管理',
          icon: Download,
        },
      },
      {
        path: '/recent',
        name: 'Recent',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '最近播放',
          icon: Recent,
        },
      },
      {
        path: '/my/podcast',
        name: 'Mypodcast',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '我的播客',
          icon: Podcast,
        },
      },
      {
        path: '/local',
        name: 'Local',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '本地音乐',
          icon: Dir,
        },
      },
      {
        path: '/my/cloud',
        name: 'MyCloud',
        component: () => import('@/views/home/home.vue'),
        meta: {
          name: '我的音乐云盘',
          icon: Cloud,
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/profile.vue'),
        meta: {
          name: '个人中心',
          icon: User,
        },
      },
    ],
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/layout.vue'),
    children: [
      ...sidebarRoutes,
      {
        path: '/playlist/:id',
        name: 'Playlist',
        component: () => import('@/views/playlist/playlist.vue'),
        meta: {
          title: '歌单',
        },
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/search.vue'),
      },
      {
        path: '/artist/:id',
        name: 'Artist',
        component: () => import('@/views/artist/artist.vue'),
      }
    ],
  },
]

export default routes
