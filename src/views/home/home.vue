<template>
  <div class="home">
    <Banner />
    <RecommendPlaylist />
  </div>
</template>

<script setup lang="ts">
import Banner from './banner.vue'
// import RecommendSongs from './recommend-songs.vue'
import RecommendPlaylist from './recommend-playlist.vue'

defineOptions({
  name: 'Home',
})
</script>

<style scoped></style>
