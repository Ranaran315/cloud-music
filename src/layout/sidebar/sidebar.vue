<template>
  <div :class="ucn.b()">
    <div v-for="(s, index) of sidebar" :key="index" :class="ucn.e('menu')">
      <div :class="ucn.e('menu-title')">{{ s.title }}</div>
      <div
        v-for="(item, index) of s.list"
        :key="index"
        :class="ucn.e('menu-item')"
      >
        <ra-icon :class="ucn.e('menu-icon')" size="1.5em">
          <component :is="item.icon" />
        </ra-icon>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
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
  Recent,
} from '@/icons'
import Dir from '@/icons/dir.vue'

const ucn = useClassName('sidebar', false)
defineOptions({
  name: 'Sidebar',
})

const sidebar = [
  {
    list: [
      {
        name: '首页',
        icon: Home,
      },
      {
        name: '云音乐精选',
        icon: Music,
      },
      {
        name: '播客',
        icon: Podcast,
      },
      {
        name: '私人漫游',
        icon: Wander,
      },
      {
        name: '社区',
        icon: Community,
      },
    ],
  },
  {
    title: '我的',
    list: [
      {
        name: '我喜欢的音乐',
        icon: Like,
      },
      {
        name: '我的收藏',
        icon: Collect,
      },
      {
        name: '下载管理',
        icon: Download,
      },
      {
        name: '最近播放',
        icon: Recent,
      },
      {
        name: '我的播客',
        icon: Podcast,
      },
      {
        name: '本地音乐',
        icon: Dir,
      },
      {
        name: '我的音乐云盘',
        icon: Cloud,
      },
    ],
  },
]
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'sidebar',
  $use-namespace: false
);

@include b() {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: 200px;
  height: calc(100vh - var(--navbar-height));
  background-color: getFillColor();
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @include e('menu') {
    width: 100%;
    @include e('menu-title') {
      font-family: 'deyihei';
      padding: 0 12px;
      margin-bottom: 8px;
      font-size: 1.2rem;
      font-style: italic;
      color: getTextColor();
      text-align: left;
    }
    @include e('menu-item') {
      display: flex;
      align-items: center;
      padding: 0 12px;
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: getFillColor('third');
      }
      @include e('menu-icon') {
        margin-right: 10px;
      }
    }
  }
}
</style>
