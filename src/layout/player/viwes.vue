<template>
  <Transition name="slide-top">
    <div
      :class="ucn.b()"
      :style="playerStyle"
      v-show="playerStore.getState().showFullScreen"
    >
      <div :class="ucn.e('left')">
        <div
          :class="[
            ucn.e('cover'),
            ucn.is(playerStore.getState().isPlaying, 'playing'),
          ]"
        >
          <cloud-image
            :class="ucn.e('cover-image')"
            :src="song?.al?.picUrl"
            @load="handleImageLoad"
          />
        </div>
      </div>
      <div :class="ucn.e('right')">
        <div :class="ucn.e('info')">
          <div :class="ucn.e('name')">{{ song?.name }}</div>
          <div :class="ucn.e('artist')">
            {{ song?.ar?.map((item) => item.name).join('/') }}
          </div>
          <div :class="ucn.e('album')">{{ song?.al?.name }}</div>
        </div>
        <div :class="ucn.e('lyric')">
          <div
            @click.stop="playerStore.updateAudioTime(line.time)"
            :class="[
              ucn.e('line'),
              ucn.is(isActive(line.time, index), 'active'),
            ]"
            v-for="(line, index) of lyrics"
            :key="index"
          >
            <ra-icon :class="ucn.e('play-button')" v-if="line.content"
              ><Play
            /></ra-icon>
            <div :class="ucn.e('content')">{{ line.content }}</div>
            <div :class="ucn.e('time')" v-if="line.content">
              {{ formatDuration(line.time) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { songApi } from '@/api'
import { useClassName } from '@/hooks'
import { rgbToHex } from '@/utils/color'
import { formatDuration } from '@/utils/format'
import { parseLyric } from '@/utils/parse'
import { Lyric } from '@/utils/type'
import ColorThief from 'colorthief'
import { computed, type CSSProperties, ref, watch } from 'vue'
import { RaIcon } from '@capybara-plus/vue'
import { Play } from '@/icons'
import { usePlayerStore } from '@/store'

const ucn = useClassName('player-viwes', false)
defineOptions({
  name: 'PlayerViews',
})

const playerStore = usePlayerStore()

const song = computed(() => playerStore.getState().currentSong) // 当前播放歌曲
const lyrics = ref<Lyric[]>([]) // 歌词
const currentTime = computed(() => playerStore.getState().currentTime) // 当前播放时间
const currentIndex = ref(0) // 当前高亮的歌词

/**
 * @description 计算当前歌词
 */
const isActive = computed(() => {
  return (time: number, index: number) => {
    if (!lyrics.value[index].content || !time) return false
    // 当歌词时间 <= 当前的播放时间
    if (time <= currentTime.value!) {
      // 递归判断下一行不为空的歌词的时间是否 > 当前播放时间
      function findNextNoEmpty(index: number) {
        const nextLine = lyrics.value[index]
        if (!nextLine) return true
        if (!nextLine.content) return findNextNoEmpty(index + 1)
        return nextLine.time > currentTime.value!
      }
      if (findNextNoEmpty(index + 1)) {
        currentIndex.value = index
        return true
      }
    }
    return false
  }
})

// 让高亮歌词居中
watch(
  () => currentIndex.value,
  () => {
    const element = document.querySelector(`.${ucn.b()} .is-active`)
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  },
  {
    immediate: true,
  }
)

/**
 * @description 根据封面设置背景颜色
 */
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

/**
 * @description 获取歌词
 */
watch(
  () => song.value?.id,
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

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'player-viwes',
  $use-namespace: false
);

@include b() {
  width: 100vw;
  max-height: 100vh;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  padding-bottom: var(--player-controller-height);
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
      animation: rotate 10s linear infinite;
      animation-play-state: paused;
      &.is-playing {
        animation-play-state: running;
      }
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
      user-select: none;
      &::-webkit-scrollbar {
        display: none;
      }
      @include e('line') {
        position: relative;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.3;
        cursor: pointer;
        padding: 5px 0;
        &.is-active {
          opacity: 1;
          color: getColor('primary');
          background-color: rgba($color: getFillColor(), $alpha: 0.1);
        }
        &:hover {
          opacity: 1;
          @include e('play-button') {
            display: block;
          }
          @include e('time') {
            display: block;
          }
        }
        @include e('play-button') {
          width: 30px;
          position: absolute;
          left: 0;
          display: none;
        }
        @include e('content') {
          font-size: 1.2rem;
          margin: 0 auto;
          padding: 0 100px;
        }
        @include e('time') {
          width: 60px;
          right: 0;
          position: absolute;
          font-size: 0.9rem;
          display: none;
        }
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
