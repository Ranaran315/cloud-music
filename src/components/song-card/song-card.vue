<template>
  <div :class="ucn.b()" @click.stop="handleClick">
    <div :class="ucn.e('cover')">
      <cloud-image :src="data.al?.picUrl" />
    </div>
    <div :class="ucn.e('info')">
      <div :class="ucn.e('name')">{{ data.name }}</div>
      <div :class="ucn.e('artist')">
        {{ formatAlias(data.ar.map((a) => a.name)) }}
      </div>
      <div :class="ucn.e('alias')">
        {{ formatAlias(data.alia) }}
      </div>
    </div>
    <div :class="ucn.e('duration')">{{ formatDuration(data.dt) }}</div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useSongStore } from '@/store'
import { formatAlias, formatDuration } from '@/utils/format'
import { definePropType } from '@/utils/props'
import { Song } from '@/utils/type'

const ucn = useClassName('song-card')
defineOptions({
  name: 'CloudSongCard',
})

const props = defineProps({
  data: {
    type: definePropType<Song>(Object),
    required: true,
  },
})

const songStore = useSongStore()
const handleClick = () => {
  songStore.setCurrentSong(props.data)
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'song-card');

@include b() {
  @include flex($align: center);
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
    @include flex(column, center, $gap: 5px);
    padding: 10px 0;
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
  }
}
</style>
