<template>
  <div :class="ucn.b()">
    <n-tabs type="line" animated @update-value="handleUpdateTab" :value="value">
      <n-tab-pane
        v-for="item of searchContext.tabs"
        :key="item.name"
        :name="item.name"
        :tab="item.tab"
      >
        <template #default>
          <cloud-loading :show="loading">
            <div :class="ucn.e('result')">
              <component :is="item.component" />
            </div>
          </cloud-loading>
        </template>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { searchApi } from '@/api'
import { useClassName } from '@/hooks'
import { NTabs, NTabPane } from 'naive-ui'
import { computed, provide, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SearchContextKey, useSearchContext } from './context'

const ucn = useClassName('search', false)
defineOptions({
  name: 'Search',
})

const searchContext = useSearchContext()
provide(SearchContextKey, searchContext)

const route = useRoute()
const router = useRouter()
const loading = computed(() => searchContext.state.loading) // 加载状态
const value = computed(() => route.query.type as string) // 当前 tab

// 当 tab 更新时
const handleUpdateTab = (value: string) => {
  router.replace({
    query: {
      ...route.query,
      type: value,
    },
  })
}

// 搜索
const search = async () => {
  try {
    searchContext.setLoading(true)
    const { keywords, type } = route.query
    const { result } = await searchApi.search({
      keywords: keywords as string,
      type: type as unknown as number,
    })
    searchContext.setResult(result)
  } catch (error) {
    console.log(error)
  } finally {
    searchContext.setLoading(false)
  }
}

watchEffect(async () => {
  await search()
})
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'search', $use-namespace: false);

:deep(.n-tabs-nav) {
  position: fixed;
  top: var(--navbar-height);
  z-index: 1;
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
  position: relative;
  @include e('result') {
    min-height: 200px;
    padding: 20px 0;
  }
}
</style>
