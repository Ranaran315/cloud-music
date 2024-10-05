<template>
  <div :class="ucn.b()">
    <cloud-tab
      :tabs="searchContext.tabs"
      @update-value="handleUpdateTab"
      :value="value"
    >
      <template #default="{ tab }">
        <div :class="ucn.e('result')">
          <component :is="tab.component" />
        </div>
      </template>
    </cloud-tab>
  </div>
</template>

<script setup lang="ts">
import { searchApi } from '@/api'
import { useClassName } from '@/hooks'
import { computed, provide, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { SearchContextKey, useSearchContext } from './context'

const ucn = useClassName('search', false)
defineOptions({
  name: 'Search',
})

const searchContext = useSearchContext()
provide(SearchContextKey, searchContext)

const route = useRoute()
const value = computed(() => route.query.type as string) // 当前 tab

// 当 tab 更新时
const handleUpdateTab = (value: number) => {
  searchContext.changeTab(value as unknown as number)
}

// 搜索
const search = async () => {
  const { keywords, type } = route.query
  try {
    searchContext.setLoading(type as unknown as number, true)
    const { result } = await searchApi.search({
      keywords: keywords as string,
      type: type as unknown as number,
    })
    searchContext.setResult(result)
  } catch (error) {
    console.log(error)
  } finally {
    searchContext.setLoading(type as unknown as number, false)
  }
}

watchEffect(async () => {
  await search()
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'search', $use-namespace: false);

:deep(.n-tabs-nav) {
  width: 100%;
  position: fixed;
  top: var(--navbar-height);
  z-index: getZIndex('tabnav');
  background-color: getFillColor();
}

@include b() {
  width: 100%;
  position: relative;
  @include e('result') {
    min-height: 200px;
    padding: 20px 0;
  }
}
</style>
