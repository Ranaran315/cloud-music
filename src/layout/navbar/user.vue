<template>
  <div :class="ucn.b()">
    <template v-if="isLogined">
      <n-popover
        v-model:show="showPopover"
        trigger="hover"
        raw
        :scrollable="false"
        :show-arrow="false"
        placement="bottom"
        to="#app"
      >
        <template #trigger>
          <div :class="[ucn.e('base-info'), ucn.is(showPopover, 'hidden')]">
            <img
              :class="ucn.e('avatar')"
              :src="profile?.avatarUrl"
              object-fit="cover"
            />
            <div :class="ucn.e('nickname')">{{ profile?.nickname }}</div>
          </div>
        </template>
        <div :class="ucn.e('popover')">
          <div :class="ucn.e('header')">
            <img
              :class="ucn.e('avatar')"
              :src="profile?.avatarUrl"
              object-fit="cover"
            />
            <div :class="ucn.e('nickname')">
              {{ profile?.nickname }}
              <div :class="ucn.e('level')">Lv{{ userInfo.level }}</div>
            </div>
          </div>
          <div :class="ucn.e('content')">
            <div :class="ucn.e('meta')">
              <div
                v-for="(item, index) of metas"
                :key="index"
                :class="ucn.e('meta-item')"
              >
                <span :class="ucn.e('count')">{{ item.count }}</span>
                <span :class="ucn.e('title')">{{ item.title }}</span>
              </div>
            </div>
            <div :class="ucn.e('menu')">
              <router-link :class="ucn.e('menu-item')" to="/profile"
                >个人中心</router-link
              >
              <div :class="ucn.e('menu-item')" @click="logout">退出登录</div>
            </div>
          </div>
        </div>
      </n-popover>
    </template>
    <template v-else>
      <div :class="ucn.e('nologin')" @click="useLogin">
        暂未登录，登录享受更多权益~
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { useLoginStore } from '@/store'
import { computed, ref } from 'vue'
import { NPopover } from 'naive-ui'
import { useLogin } from '@/components'
import { useUserStore } from '@/store'

const ucn = useClassName('navbar-user', false)

defineOptions({
  name: 'NavbarUser',
})

const showPopover = ref(false)

const loginStore = useLoginStore()
const userStore = useUserStore()

const isLogined = computed(() => loginStore.isLogined)
const userInfo = computed(() => userStore.userInfo)
const profile = computed(() => userStore.profile)
const metas = computed(() => {
  return [
    {
      title: '关注',
      count: profile.value?.follows ?? 0,
    },
    {
      title: '粉丝',
      count: profile.value?.followeds ?? 0,
    },
    {
      title: '听歌（首）',
      count: userInfo.value.listenSongs ?? 0,
    },
  ]
})

userStore.getUserInfo()

const logout = async () => {
  await loginStore.logout()
}
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'navbar-user',
  $use-namespace: false
);

@include b() {
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  @include e('base-info') {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: opacity 0.3s;
    &.is-hidden {
      opacity: 0;
    }
  }
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
  }
  @include e('nologin') {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

@include e('popover') {
  width: 300px;
  background-color: getFillColor();
  color: getTextColor();
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: getBoxShadow();
  @include e('header') {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    @include e('avatar') {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    @include e('nickname') {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 50px;
      font-size: 1.2rem;
      color: getColor('primary');
      display: flex;
      align-items: center;
      @include e('level') {
        font-size: 0.6rem;
        margin-left: 5px;
        padding: 2px 5px;
        background-color: getColor('primary');
        color: getFillColor();
        border-radius: 5px;
      }
    }
  }
  @include e('content') {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 10px;
    @include e('meta') {
      padding: 10px;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      @include e('meta-item') {
        display: flex;
        flex-direction: column;
        gap: 2px;
        @include e('count') {
          color: getColor('primary');
          font-size: 1.2rem;
          font-weight: 700;
        }
      }
    }
    @include e('menu') {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      @include e('menu-item') {
        padding: 5px;
        width: 100%;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 20px;
        &:hover {
          background-color: getFillColor('secondary');
        }
      }
    }
  }
}
</style>
