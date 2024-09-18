<template>
  <n-modal v-model:show="show" :on-after-leave="destory">
    <div :class="ucn.b()">
      <div :class="ucn.e('header')">
        <ra-icon size="10rem" style="height: fit-content">
          <LogoWithName />
        </ra-icon>
        <ra-icon size="1.5rem" :class="ucn.e('close')" @click="close">
          <Close />
        </ra-icon>
      </div>
      <div :class="ucn.e('center')">
        <KeepAlive>
          <component :is="isQRLogin ? QRLogin : CaptchaLogin"></component>
        </KeepAlive>
      </div>
      <CloudTooltip :content="isQRLogin ? '验证码登录' : '二维码登录'">
        <div :class="ucn.e('bottom')" @click.stop="isQRLogin = !isQRLogin">
          <ra-icon>
            <component :is="isQRLogin ? Phone : QR"></component>
          </ra-icon>
        </div>
      </CloudTooltip>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { NModal } from 'naive-ui'
import { ref } from 'vue'
import { RaIcon } from '@capybara-plus/vue'
import { LogoWithName, Close, QR, Phone } from '@/icons'
import { CloudTooltip } from '../tooltip'
import QRLogin from './qr.vue'
import CaptchaLogin from './captcha.vue'

const ucn = useClassName('login', false)
defineOptions({
  name: 'CloudLogin',
})

defineProps({
  destory: {
    type: definePropType<() => void>(Function),
    required: true,
  },
})

// 控制展示登录模态框
const show = ref(false)
;(function open() {
  show.value = true
})()
function close() {
  show.value = false
}

const isQRLogin = ref(true)
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'login',
  $use-namespace: false
);

@include b() {
  user-select: none;
  @include flex(column, space-between, $gap: 20px) {
    flex-wrap: nowrap;
  }
  position: relative;
  width: 600px;
  height: 450px;
  padding: 20px 30px;
  background-color: getFillColor();
  border-radius: 10px;
  background: linear-gradient(145deg, getFillColor(), getColor('primary'));
  @include e('header') {
    @include flex(row, space-between, center);
    @include e('close') {
      cursor: pointer;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  @include e('center') {
    width: 100%;
    flex: 1;
  }
  @include e('bottom') {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    cursor: pointer;
    font-size: 2.5rem;
    text-align: left;
    line-height: 50px;
    color: getFillColor();
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border: 25px solid transparent;
      border-top-color: getFillColor();
      border-left-color: getFillColor();
      border-radius: inherit;
    }
  }
}
</style>
