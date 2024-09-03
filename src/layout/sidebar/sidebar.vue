<template>
  <div :class="ucn.b()">
    <div
      v-for="(s, index) of sidebarRoutes"
      :key="index"
      :class="ucn.e('menu')"
    >
      <div :class="ucn.e('menu-title')">{{ s.meta?.title }}</div>
      <router-link
        :to="item.path"
        v-for="(item, index) of s.children"
        :key="index"
        :class="[ucn.e('menu-item'), ucn.is(item.name == route.name, 'active')]"
      >
        <ra-icon :class="ucn.e('menu-icon')" size="1.5em">
          <component :is="item.meta?.icon" />
        </ra-icon>
        {{ item.meta?.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
import { sidebarRoutes } from '@/route/routes'
import { useRoute } from 'vue-router'

const ucn = useClassName('sidebar', false)
defineOptions({
  name: 'Sidebar',
})

const route = useRoute()
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'sidebar',
  $use-namespace: false
);

@include b() {
  position: fixed;
  z-index: var(--sidebar-z-index);
  top: var(--navbar-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
  background-color: getFillColor();
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: hidden;
  box-sizing: border-box;
  &:hover {
    overflow-y: auto;
  }
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
      transition: background 0.3s;
      &:hover {
        background-color: getFillColor('third');
      }
      &.is-active {
        background-color: getColor('primary');
        color: getFillColor();
      }
      @include e('menu-icon') {
        margin-right: 10px;
      }
    }
  }
}
</style>
