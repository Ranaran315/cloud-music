<template>
  <div :class="ucn.b()">
    <n-popover
      trigger="click"
      raw
      :show-arrow="false"
      @update-show="handleUpdateShow"
    >
      <template #trigger><cloud-icon :icon="Menu" /> </template>
      <div :class="ucn.e('popover')">
        <div :class="ucn.e('header')">
          <div :class="ucn.e('title')">播放列表</div>
          <div :class="ucn.e('operator')">
            <div
              :class="ucn.e('operator-item')"
              @click.stop="toPlaylistStore.clear"
            >
              <cloud-icon :icon="Delete"></cloud-icon>
              清除
            </div>
          </div>
        </div>
        <cloud-loading :show="loading">
          <div :class="ucn.e('list')">
            <div
              :class="[ucn.e('item'), ucn.is(isCurrent(song.id), 'active')]"
              v-for="song of songs"
              :key="song.id"
              @click.stop="songStore.setCurrentSong(song)"
            >
              <cloud-image
                :class="ucn.e('cover')"
                :src="song.al?.picUrl"
              ></cloud-image>

              <div :class="ucn.e('info')">
                <div :class="ucn.e('name')">{{ song.name }}</div>
                <div :class="ucn.e('artist')">
                  {{ formatName(song.ar, 'name') }}
                </div>
              </div>
              <div :class="ucn.e('duration')">
                {{ formatDuration(song.dt) }}
              </div>
            </div>
          </div>
        </cloud-loading>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { Delete, Menu } from '@/icons'
import { NPopover } from 'naive-ui'
import { songApi } from '@/api'
import { useSongStore, useToPlaylistStore } from '@/store'
import { Song } from '@/utils/type'
import { computed, ref, watchEffect } from 'vue'
import { formatDuration, formatName } from '@/utils/format'

const ucn = useClassName('to-playlist', false)
defineOptions({
  name: 'ToPlaylist',
})

const songs = ref<Song[]>([])
const toPlaylistStore = useToPlaylistStore()
const songStore = useSongStore()
const isCurrent = computed(() => (id: number) => songStore.song?.id === id)

const loading = ref(false)

// 当 popover 显示时，获取播放列表的歌曲详情
const handleUpdateShow = async (show: boolean) => {
  watchEffect(async () => {
    if (show) {
      try {
        loading.value = true
        const { songs: gotSongs } = await songApi.getSongDetail(
          toPlaylistStore.getList()
        )
        songs.value = gotSongs
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }

      /**
       * @todo 有 bug ，body 会跟着一起滚动
       */
      // const element = document.querySelector('.to-playlist__item.is-active')
      // element?.scrollIntoView({
      //   block: 'center',
      // })
    }
  })
}

toPlaylistStore.init()
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'to-playlist',
  $use-namespace: false
);

@include b() {
}

@include e('popover') {
  $popover-height: 400px;
  $header-height: 30px;
  width: 300px;
  height: $popover-height;
  overflow: hidden;
  background-color: getFillColor();
  padding: 10px 0;
  @include e('header') {
    height: $header-height;
    margin-bottom: 20px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include e('title') {
      font-size: 1.2rem;
      font-weight: 700;
    }
    @include e('operator') {
      display: flex;
      gap: 10px;
      @include e('operator-item') {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: getTextColor('secondary');
        &:hover {
          color: getColor('primary');
        }
      }
    }
  }
  @include e('list') {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(#{$popover-height} - #{$header-height} - 20px);
    overflow-y: auto;
    @include e('item') {
      $size: 40px;
      height: $size;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      cursor: pointer;
      &:hover {
        background-color: getFillColor('secondary');
      }
      &.is-active {
        color: getColor('primary');
      }
      @include e('cover') {
        width: $size;
        height: $size;
        border-radius: 50%;
      }
      @include e('info') {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @include e('artist') {
          font-size: 0.8rem;
          color: getTextColor('secondary');
        }
      }
      @include e('duration') {
        font-size: 0.8rem;
        color: getTextColor('secondary');
      }
    }
  }
}
</style>
