<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('left')">
      <cloud-image
        :class="ucn.e('example')"
        src="/qrlogin-example.png"
        object-fit="contain"
      ></cloud-image>
    </div>
    <div :class="ucn.e('right')">
      <div :class="ucn.e('qr-code')">
        <cloud-image
          :src="qrImg"
          :class="[ucn.e('qr-code-image'), ucn.is(isExpired, 'expired')]"
        >
        </cloud-image>
        <div v-show="isExpired" :class="ucn.e('refresh')">
          <cloud-button @click="refresh" :loading="loading" :icon="Refresh">
            点击刷新
          </cloud-button>
        </div>
      </div>
      <span :class="ucn.e('qr-status')">{{ statusMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { CloudButton } from '../button'
import { CloudImage } from '@/components'
import { Refresh } from '@/icons'
import { useLoginStore, QRCodeStatus } from '@/store'
import { computed, onActivated, onDeactivated, onUnmounted, ref } from 'vue'

const ucn = useClassName('qr-login', false)
defineOptions({
  name: 'QRLogin',
})

const loginStore = useLoginStore()

// 二维码图片
const qrImg = computed(() => loginStore.qrImg)
// 获取二维码
async function getQRCode() {
  await loginStore.getQRCode()
}

// 根据二维码状态显示不同的提示信息
const statusMessage = computed(() => {
  switch (loginStore.qrStatus) {
    case QRCodeStatus.WAIT_SCAN:
      return '打开网易云App扫一扫'
    case QRCodeStatus.SCAN_SUCCESS:
      return '扫描成功，请在App中确认登录'
    case QRCodeStatus.AUTH_SUCCESS:
      return '授权成功，正在登录'
    case QRCodeStatus.EXPIRED:
      return '二维码已过期，请刷新'
    default:
      return '未知错误'
  }
})

// 二维码是否过期
const isExpired = computed(() => loginStore.qrStatus === QRCodeStatus.EXPIRED)

// 重新获取二维码
const loading = ref(false)
const refresh = async () => {
  try {
    loading.value = true
    await getQRCode()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  // 停止轮询检查二维码状态
  loginStore.stopCheck()
})

onActivated(() => {
  getQRCode()
})
onDeactivated(() => {
  loginStore.stopCheck()
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'qr-login',
  $use-namespace: false
);

@include b() {
  @include flex($align: center) {
    flex-wrap: nowrap;
  }
  @include e('left') {
    width: 50%;
    display: flex;
    justify-content: center;
    @include e('example') {
      height: 300px;
    }
  }
  @include e('right') {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @include e('qr-code') {
      position: relative;
      border-radius: 20px;
      @include e('qr-code-image') {
        border-radius: getBorderRadius('normal');
        &#{is('expired')} {
          filter: blur(5px);
        }
      }
      @include e('refresh') {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: getColor('primary');
        font-weight: 700;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s;
      }
    }
    @include e('qr-status') {
      font-size: 1.2rem;
      font-weight: 700;
      white-space: nowrap;
    }
  }
}
</style>
