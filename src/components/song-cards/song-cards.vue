<template>
  <div :class="ucn.b()">
    <cloud-skeleton :show="loading">
      <template #skeleton>
        <Skeleton v-for="i of 3" :key="i"></Skeleton>
      </template>
      <div
        v-for="item of data"
        :key="item.id"
        :class="ucn.e('item')"
        @click.stop="handleClick(item.id)"
        @contextmenu.stop="handleContextmenu($event, item)"
      >
        <div :class="ucn.e('cover')">
          <cloud-image :src="item.al?.picUrl" />
        </div>
        <div :class="ucn.e('info')">
          <div :class="ucn.e('name')">{{ item.name }}</div>
          <div :class="ucn.e('artist')">
            {{ formatAlias(item.ar.map((a) => a.name)) }}
          </div>
          <div :class="ucn.e('alias')">
            {{ formatAlias(item.alia) }}
          </div>
        </div>
        <div :class="ucn.e('duration')">{{ formatDuration(item.dt) }}</div>
      </div>
    </cloud-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useClassName, useSongContextMenu } from '@/hooks'
import { usePlayerStore } from '@/store'
import { formatAlias, formatDuration } from '@/utils/format'
import { definePropType } from '@/utils/props'
import { Song } from '@/utils/interface'
import { CloudImage } from '@/components/image'
import Skeleton from './skeleton.vue'

const ucn = useClassName('song-cards')
defineOptions({
  name: 'CloudSongCards',
})

defineProps({
  data: definePropType<Song[]>(Object),
  loading: Boolean,
})

const playerStore = usePlayerStore()
const handleClick = (id: number) => {
  playerStore.setCurrentSong(id)
}

const handleContextmenu = (e: MouseEvent, item: Song) => {
  useSongContextMenu(e, item)
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'song-cards');

@include b() {
  @include grid() {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    row-gap: 30px;
    column-gap: 20px;
  }
  @include e('item') {
    @include flex($align: center) {
      flex-wrap: nowrap;
    }
    min-width: 300px;
    height: 80px;
    cursor: pointer;
    border-radius: getBorderRadius('small');
    outline: 1px solid transparent;
    background-color: getFillColor('secondary');
    transition: all 0.3s;
    &:hover {
      outline-color: getColor('primary');
    }
    @include e('cover') {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: inherit;
    }
    @include e('info') {
      @include flex(column, center, $gap: 2px);
      max-width: 220px;
      padding: 5px 0;
      flex: 1;
      font-size: 0.8rem;
      color: getTextColor('secondary');
      @include e('name') {
        font-size: 1rem;
        font-weight: 700;
        color: getTextColor('primary');
        @include ellipsis();
      }
      @include e('artist') {
        @include ellipsis();
      }
      @include e('alias') {
        @include ellipsis();
      }
    }
    @include e('duration') {
      font-size: 0.8rem;
      color: getTextColor('secondary');
      margin-right: 20px;
      margin-left: auto;
    }
  }
}
</style>
