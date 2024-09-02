<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('title')">推荐歌单</div>
    <div :class="ucn.e('list')">
      <div
        :class="ucn.e('item')"
        v-for="item of recommendStore.recommendlist"
        :key="item.id"
      >
        <div :class="ucn.e('cover')">
          <n-image
            :class="ucn.e('cover-image')"
            :src="item.coverImgUrl"
            width="100%"
            object-fit="contain"
            preview-disabled
            lazy
          ></n-image>
          <div :class="ucn.e('cover-title')" v-if="item.detailPageTitle">
            {{ item.detailPageTitle }}
          </div>
        </div>
        <div :class="ucn.e('content')">
          <div :class="ucn.e('name')">{{ item.name }}</div>
          <div :class="ucn.e('creator')">
            <n-image
              :class="ucn.e('creator-avatar')"
              :src="item.creator.avatarUrl"
              preview-disabled
              lazy
            ></n-image>
            <div :class="ucn.e('creator-name')">
              {{ item.creator.nickname }}
            </div>
          </div>
          <div :class="ucn.e('meta')">
            <span>{{ formatNumber(item.playCount) }} 次播放</span>
            <span>{{ formatTime(item.createTime) }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useRecommendStore } from '@/store'
import { onMounted } from 'vue'
import { NImage } from 'naive-ui'
import { formatNumber, formatTime } from '@/utils/format'

const ucn = useClassName('recommend-playlist', false)

defineOptions({
  name: 'RecommendPlaylist',
})

const recommendStore = useRecommendStore()
onMounted(() => {
  recommendStore.getRecommendList()
})
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
  @include e('item') {
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
        background-color: rgba(0, 0, 0, 0.5);
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
}
</style>
