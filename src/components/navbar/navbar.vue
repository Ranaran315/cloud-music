<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('logo')">
      <ra-icon>
        <LogoWithName />
      </ra-icon>
    </div>
    <cloud-search />
    <div :class="ucn.e('menu')">
      <div
        v-for="(item, index) of menuItem"
        :key="index"
        :class="ucn.e('menu-item')"
      >
        <cloud-tooltip :content="item.name" placement="top">
          <component :is="item.component"></component>
        </cloud-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
import { CloudTooltip } from '../tooltip'
import { LogoWithName } from '@/icons'
import CloudSearch from './search.vue'
import CloudMessage from './message.vue'
import CloudSkin from './skin.vue'
import CloudSetting from './setting.vue'
import CloudUser from './user.vue'

const ucn = useClassName('navbar', false)
defineOptions({
  name: 'CloudNavbar',
})

const menuItem = [
  {
    name: '用户',
    component: CloudUser,
  },
  {
    name: '通知',
    component: CloudMessage,
  },

  {
    name: '皮肤',
    component: CloudSkin,
  },
  {
    name: '设置',
    component: CloudSetting,
  },
]
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'navbar',
  $use-namespace: false
);

@include b() {
  position: relative;
  $height: 60px;
  width: 100%;
  height: $height;
  border-radius: $height;
  background-color: getColor('primary');
  padding: 10px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include e('logo') {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12rem;
    margin-right: 30px;
  }
  @include e('menu') {
    display: flex;
    align-items: center;
    gap: 20px;
    @include e('menu-item') {
      $size: 40px;
      min-width: $size;
      height: $size;
    }
  }
}
</style>
