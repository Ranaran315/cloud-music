<template>
  <div :class="ucn.b()">
    <n-tabs type="line" animated>
      <n-tab-pane
        v-for="item of tabs"
        :key="item.name"
        :name="item.name"
        :tab="item.tab"
      ></n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { NTabs, NTabPane } from 'naive-ui'

const ucn = useClassName('search', false)
defineOptions({
  name: 'Search',
})

const tabs = [
  {
    name: '1018',
    tab: '综合',
  },
  {
    name: '1',
    tab: '单曲',
  },
  {
    name: '1000',
    tab: '歌单',
  },
  {
    name: '100',
    tab: '歌手',
  },
  {
    name: '2000',
    tab: '声音',
  },
  {
    name: '1009',
    tab: '博客',
  },
  {
    name: '1006',
    tab: '歌词',
  },
  {
    name: '10',
    tab: '专辑',
  },
  {
    name: '1014',
    tab: 'MV',
  },
  {
    name: '1002',
    tab: '用户',
  },
]
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'search', $use-namespace: false);

:deep(.n-tabs-tab) {
  .n-tabs-tab__label {
    font-weight: 700;
  }
  &:hover {
    color: getColor('primary') !important;
  }
}
:deep(.n-tabs-tab--active) {
  color: getColor('primary') !important;
}
:deep(.n-tabs-bar) {
  background-color: getColor('primary');
}
</style>
