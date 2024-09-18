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
  @include flex($direction: column, $justify: flex-start);
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
      @include ellipsis();
    }
  }
  @include e('content') {
    @include flex(column, center);
    padding: 10px;
    @include e('name') {
      @include multiEllipsis(3);
      flex-grow: 1;
      text-align: left;
    }
    @include e('creator') {
      @include flex($align: center);
      &:hover {
        color: getColor('primary');
      }
      @include e('creator-avatar') {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      @include e('creator-name') {
        margin-left: 5px;
      }
    }
    @include e('meta') {
      width: 100%;
      @include flex(row, space-between, center);
      font-size: 0.85rem;
      color: getTextColor('secondary');
    }
  }
}
</style>
