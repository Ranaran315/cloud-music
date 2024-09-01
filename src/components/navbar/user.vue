<template>
  <div :class="ucn.b()">
    <img
      :class="ucn.e('avatar')"
      :src="profile?.avatarUrl"
      object-fit="cover"
    />
    <div :class="ucn.e('nickname')">{{ profile?.nickname }}</div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useLoginStore } from '@/store'
import { computed } from 'vue'

const ucn = useClassName('navbar-user', false)

defineOptions({
  name: 'NavbarUser',
})

const loginStore = useLoginStore()

const profile = computed(() => loginStore.userInfo?.profile)
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'navbar-user',
  $use-namespace: false
);

@include b() {
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  @include e('avatar') {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  @include e('nickname') {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: getFillColor();
  }
}
</style>
