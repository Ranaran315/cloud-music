<template>
  <cloud-album-cards :data="albums" :loading="searchContext?.state.loading" />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'

defineOptions({
  name: 'SearchAlbums',
})

const searchContext = inject(SearchContextKey, undefined)
const albums = computed(() => searchContext?.state.result.albums)
</script>
