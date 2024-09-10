<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('title')">推荐歌单</div>
    <cloud-loading :show="loading">
      <div :class="ucn.e('list')">
        <cloud-playlist-card
          v-for="item of playlistStore.recommendlist"
          :key="item.id"
          :data="item"
        ></cloud-playlist-card>
      </div>
    </cloud-loading>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { usePlaylistStore } from '@/store'
import { onMounted, ref } from 'vue'

const ucn = useClassName('recommend-playlist', false)

defineOptions({
  name: 'RecommendPlaylist',
})

const playlistStore = usePlaylistStore()
onMounted(async () => {
  loading.value = true
  await playlistStore.getRecommendList() // 获取推荐歌单
  loading.value = false
})

const loading = ref(false)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'recommend-playlist',
  $use-namespace: false
);

@include b() {
  padding: 20px 0;
  @include e('title') {
    font-family: 'deyihiei';
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: left;
  }
  @include e('list') {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    row-gap: 40px;
  }
}
</style>
