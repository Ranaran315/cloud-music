<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('logo')">
      <ra-icon>
        <LogoWithName />
      </ra-icon>
    </div>
    <div :class="ucn.e('menu')">
      <div
        v-for="(item, index) of menuItem"
        :key="index"
        :class="ucn.e('menu-item')"
      >
        <cloud-tooltip :content="item.name">
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
import { reactive } from 'vue'

const ucn = useClassName('navbar')
defineOptions({
  name: 'CloudNavbar',
})

const menuItem = reactive([
  {
    name: '通知',
    component: CloudMessage,
  },
  {
    name: '搜索',
    component: CloudSearch,
  },
  {
    name: '皮肤',
    component: CloudSkin,
  },
  {
    name: '设置',
    component: CloudSetting,
  },
])
</script>

<style scoped src="@/style/components/navbar/navbar.scss"></style>
