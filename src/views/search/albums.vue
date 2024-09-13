<template>
  <cloud-loading :show="searchContext?.state.loading">
    <div :class="ucn.b()">
      <cloud-album-card v-for="item in albums" :key="item.id" :data="item" />
    </div>
  </cloud-loading>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { useClassName } from '@/hooks'

const ucn = useClassName('search-albums', false)
defineOptions({
  name: 'SearchAlbums',
})

const searchContext = inject(SearchContextKey, undefined)
const albums = computed(() => searchContext?.state.result.albums)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'search-albums',
  $use-namespace: false
);

@include b() {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  min-height: 200px;
}
</style>
