<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('item')">
      <div :class="ucn.e('header')">
        <div :class="ucn.e('title')">歌曲</div>
        <div :class="ucn.e('more')">查看更多</div>
      </div>
      <div :class="ucn.e('song-wrapper')">
        <cloud-song-card v-for="item of songs" :key="item.id" :data="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed, inject } from 'vue'
import { SearchContextKey } from './context'
import { Song } from '@/utils/type'

const ucn = useClassName('synthesis', false)
defineOptions({
  name: 'Synthesis',
})

const searchContext = inject(SearchContextKey, undefined)
const songs = computed<Song[]>(() => searchContext?.state.result.song?.songs)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'synthesis', $use-namespace: false);

@include b() {
  padding: 10px;
  @include e('header') {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    @include e('title') {
      font-size: 1.5rem;
      font-weight: bold;
    }
    @include e('more') {
      font-size: 14px;
      color: getTextColor('secondary');
      cursor: pointer;
    }
  }
  @include e('song-wrapper') {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 20px;
    row-gap: 30px;
  }
}
</style>
