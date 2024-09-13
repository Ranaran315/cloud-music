<template>
  <div :class="ucn.b()">
    <n-tabs
      type="line"
      animated
      @update-value="(val: any) => $emit('update-value', val)"
      :value="value"
    >
      <n-tab-pane
        v-for="item of tabs"
        :key="item.name"
        :name="item.name"
        :tab="item.tab"
      >
        <template #default>
          <slot :tab="item" />
        </template>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { NTabs, NTabPane } from 'naive-ui'

const ucn = useClassName('tab')
defineOptions({
  name: 'CloudTab',
})

interface Tab {
  name: string
  tab: string
  [key: string]: any
}

defineProps({
  // 选项卡列表
  tabs: {
    type: definePropType<Tab[]>(Array),
    required: true,
  },
  value: String, // 当前激活 tab 的 name
})

defineEmits({
  'update-value': (value: any) => value,
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'tab'
);

:deep(.n-tabs-nav) {
  background-color: getFillColor();
}
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

@include b() {
  width: 100%;
}
</style>
