<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('header')">验证码登录</div>
    <ra-form>
      <ra-form-item label="手机号">
        <cloud-input
          v-model="form.phone"
          placeholder="请输入手机号"
        ></cloud-input>
      </ra-form-item>
      <ra-form-item label="验证码">
        <div :class="ucn.e('captcha')">
          <cloud-input
            v-model="form.captcha"
            placeholder="请输入验证码"
          ></cloud-input>
          <cloud-button
            :class="ucn.e('button')"
            type="primary"
            @click.stop="getCaptcha"
            >{{
              countDown == 0 ? '获取验证码' : `重新获取(${countDown})`
            }}</cloud-button
          >
        </div>
      </ra-form-item>
      <ra-form-item>
        <cloud-button type="primary" block @click="login">登录</cloud-button>
      </ra-form-item>
    </ra-form>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaForm, RaFormItem } from '@capybara-plus/vue'
import { CloudButton } from '../button'
import { CloudInput } from '../input'
import { onMounted, reactive, ref } from 'vue'
import { useAsyncTryCatch } from '@/utils/async'
import { captchaApi } from '@/api'
import { useMessage } from '@/components'
import { useLoginStore } from '@/store'

const ucn = useClassName('captcha-login', false)
defineOptions({
  name: 'CaptchaLogin',
})

// 表单数据
const form = reactive({
  phone: '',
  captcha: '',
})

/**
 * @description 获取验证码
 */
const countDown = ref(0) // 验证码倒计时
let timer: any = null // 定时器
// 获取验证码
const getCaptcha = () => {
  console.log(timer)
  if (timer) return
  doGetCaptcha()
  startCountDown()
}
const doGetCaptcha = () => {
  useAsyncTryCatch(async () => {
    const { code, message } = await captchaApi.getCellPhoneCaptcha(form.phone)
    if (code === 400) {
      useMessage({
        type: 'error',
        content: message,
      })
    } else {
      useMessage({
        type: 'success',
        content: '验证码发送成功',
      })
    }
  })
}
// 开始倒计时
const startCountDown = () => {
  countDown.value = 60
  localStorage.setItem('captcha', Date.now().toString())
  startInterval()
}
// 启用定时器
const startInterval = () => {
  timer = setInterval(() => {
    countDown.value--
    if (countDown.value === 0) {
      clearInterval(timer)
      timer = null
      localStorage.removeItem('captcha')
    }
  }, 1000)
}
// 页面刷新缓存验证码倒计时
onMounted(() => {
  const countDownStart = localStorage.getItem('captcha')
  if (countDownStart) {
    const now = Date.now()
    const elapsed = Math.floor((now - parseInt(countDownStart)) / 1000)
    countDown.value = Math.max(0, 60 - elapsed)
    if (countDown.value > 0) {
      startInterval()
    }
  }
})

/**
 * @description 登录
 */
const loginStore = useLoginStore()
const login = () => {
  loginStore.loginByPhone(form.phone, form.captcha)
}
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'captcha-login',
  $use-namespace: false
);

@include b() {
  padding: 30px 0;
  @include e('header') {
    text-align: center;
    font-size: getFontSize('larger');
    font-weight: bold;
    margin-bottom: 1rem;
  }
  @include e('captcha') {
    @include flex() {
      flex-wrap: nowrap;
    }
    @include e('button') {
      min-width: 150px;
    }
  }
}
</style>
