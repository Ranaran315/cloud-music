<template>
  <div :class="ucn.b()" :style="playerStyle">
    <div :class="ucn.e('left')">
      <div :class="ucn.e('cover')">
        <img
          :class="ucn.e('cover-image')"
          :src="song.al?.picUrl"
          @load="handleImageLoad"
          crossorigin="anonymous"
        />
      </div>
    </div>
    <div :class="ucn.e('right')">
      <div :class="ucn.e('info')">
        <div :class="ucn.e('name')">{{ song.name }}</div>
        <div :class="ucn.e('artist')">
          {{ song.ar?.map((item) => item.name).join('/') }}
        </div>
        <div :class="ucn.e('album')">{{ song.al?.name }}</div>
      </div>
      <div :class="ucn.e('lyric')">
        <div
          :class="[ucn.e('line'), ucn.is(isActive(line.time, index), 'active')]"
          v-for="(line, index) of lyrics"
          :key="index"
        >
          <div :class="ucn.e('content')">{{ line.content }}</div>
          <div :class="ucn.e('time')" v-if="line.content">
            {{ formatDuration(line.time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { songApi } from '@/api'
import { useClassName } from '@/hooks'
import { useSongStore } from '@/store'
import { rgbToHex } from '@/utils/color'
import { formatDuration } from '@/utils/format'
import { parseLyric } from '@/utils/parse'
import { Lyric } from '@/utils/type'
import ColorThief from 'colorthief'
import { computed, type CSSProperties, ref, watch } from 'vue'

const ucn = useClassName('player', false)
defineOptions({
  name: 'Player',
})

const songStore = useSongStore()
const song = computed(() => songStore.song) // 当前播放歌曲
const lyrics = ref<Lyric[]>([]) // 歌词
const currentTime = ref(0)

const isActive = computed(() => {
  return (time: number, index: number) => {
    if (!lyrics.value[index + 1]) {
      return true
    }
    if (
      time <= currentTime.value &&
      lyrics.value[index + 1]!.time > currentTime.value
    ) {
      return true
    }
    return false
  }
})

// 动态设置背景颜色
const playerColor = ref<string>('#000')
const playerStyle = computed<CSSProperties>(() => {
  return {
    background: `linear-gradient(to bottom, ${playerColor.value} 0%, #000 100%)`,
  }
})
const colorthief = new ColorThief()
const handleImageLoad = (e: Event) => {
  const result = colorthief.getColor(e.target as HTMLImageElement)
  playerColor.value = rgbToHex(result)
}

// 获取歌词
watch(
  () => song.value.id,
  (id: number | undefined) => {
    if (!id) return
    songApi.getSongLyric(id).then(({ lrc }) => {
      lyrics.value = parseLyric(lrc.lyric)
    })
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'player',
  $use-namespace: false
);

@include b() {
  width: 100vw;
  max-height: 100vh;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  @include e('left') {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @include e('cover') {
      width: 450px;
      height: 450px;
      border-radius: 50%;
      overflow: hidden;
      padding: 60px;
      box-sizing: border-box;
      background-color: #000;
      @include e('cover-image') {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
      }
    }
  }
  @include e('right') {
    width: 60%;
    height: 100%;
    max-height: 100vh;
    padding: 50px 20px;
    color: getFillColor();
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    @include e('info') {
      display: flex;
      flex-direction: column;
      gap: 10px;
      @include e('name') {
        font-size: 2rem;
        font-weight: 700;
      }
      @include e('artist') {
        font-size: 1.5rem;
      }
    }
    @include e('lyric') {
      margin-top: 20px;
      overflow: auto;
      flex-grow: 1;
      &::-webkit-scrollbar {
        display: none;
      }
      @include e('line') {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
        &.is-active {
          opacity: 1;
          transform: translateY(0) rotateX(0);
          color: getColor('primary');
        }
        @include e('content') {
          font-size: 1.5rem;
          margin: 0 auto;
        }
        @include e('time') {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
