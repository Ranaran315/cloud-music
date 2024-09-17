<template>
  <div @click="toPlaylistDetail(data.id)" :class="ucn.b()" :key="data.id">
    <div :class="ucn.e('cover')">
      <cloud-image
        :class="ucn.e('cover-image')"
        :src="data.coverImgUrl"
      ></cloud-image>
      <div :class="ucn.e('cover-title')" v-if="data.detailPageTitle">
        {{ data.detailPageTitle }}
      </div>
    </div>
    <div :class="ucn.e('content')">
      <div :class="ucn.e('name')">{{ data.name }}</div>
      <div :class="ucn.e('creator')" v-if="data.id != -1">
        <cloud-image
          :class="ucn.e('creator-avatar')"
          :src="data.creator!.avatarUrl"
        ></cloud-image>
        <div :class="ucn.e('creator-name')">
          {{ data.creator!.nickname }}
        </div>
      </div>
      <div :class="ucn.e('meta')" v-if="data.id != -1">
        <span>{{ formatCount(data.playCount!) }} 次播放</span>
        <span>{{ formatTime(data.createTime!) }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { Playlist } from '@/utils/type'
import { formatCount, formatTime } from '@/utils/format'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const ucn = useClassName('playlist-card', true)
defineOptions({
  name: 'CloudPlaylistCard',
})

defineProps({
  data: {
    type: definePropType<Playlist>(Object),
    required: true,
  },
})

const router = useRouter()
const toPlaylistDetail = (id: number) => {
  nextTick(() => {
    router.push({
      path: `/playlist/${id}`,
    })
  })
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with($block: 'playlist-card', $use-namespace: true);

@include b() {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  @include e('cover') {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-shadow: getBoxShadow();
    position: relative;
    transition: box-shadow 0.3s, transform 0.3s;
    &:hover {
      box-shadow: 0 0 10px 5px rgba($color: getColor('primary'), $alpha: 0.7);
      transform: translateY(-5px);
    }
    @include e('cover-image') {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
    @include e('cover-title') {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      color: getFillColor();
      font-size: 0.85rem;
      border-radius: inherit;
      border-top-left-radius: none;
      border-top-right-radius: none;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  @include e('content') {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 10px;
    box-sizing: border-box;
    @include e('name') {
      flex-grow: 1;
      text-align: left;
      word-break: break-all;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; // 显示的行数
      overflow: hidden;
    }
    @include e('creator') {
      display: flex;
      align-items: center;
      &:hover {
        color: getColor('primary');
      }
      @include e('creator-avatar') {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      @include e('creator-name') {
        margin-left: 10px;
      }
    }
    @include e('meta') {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 0.85rem;
      color: getTextColor('secondary');
    }
  }
}
</style>
