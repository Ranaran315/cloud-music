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
            >{{ countDown == 0 ? '获取验证码' : countDown }}</cloud-button
          >
        </div>
      </ra-form-item>
      <ra-form-item>
        <cloud-button type="primary" block>登录</cloud-button>
      </ra-form-item>
    </ra-form>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaForm, RaFormItem } from '@capybara-plus/vue'
import { CloudButton } from '../button'
import { CloudInput } from '../input'
import { reactive, ref } from 'vue'

const ucn = useClassName('captcha-login', false)
defineOptions({
  name: 'CaptchaLogin',
})

// 表单数据
const form = reactive({
  phone: '',
  captcha: '',
})

// 验证码计时
const countDown = ref(0)
let timer: any = null
const getCaptcha = () => {
  if (timer) return
  countDown.value = 10
  timer = setInterval(() => {
    countDown.value--
    if (countDown.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
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
      min-width: 100px;
    }
  }
}
</style>
