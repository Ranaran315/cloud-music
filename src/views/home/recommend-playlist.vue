<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('title')">推荐歌单</div>
    <div :class="ucn.e('list')">
      <div
        :class="ucn.e('item')"
        v-for="item of recommendStore.recommendlist"
        :key="item.id"
      >
        <n-image
          :class="ucn.e('cover')"
          :src="item.coverImgUrl"
          width="100%"
          object-fit="contain"
          preview-disabled
          lazy
        ></n-image>
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
          <!-- <div :class="ucn.e('meta')">
            <span>{{ item.playCount }} 次播放</span>
          </div> -->
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
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  @include e('list') {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
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
    }
    @include e('content') {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      @include e('name') {
        text-align: left;
        word-break: break-all;
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
    }
  }
}
</style>
