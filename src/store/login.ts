import { defineStore } from 'pinia'
import loginApi from '@/api/login'
import { computed, ref } from 'vue'
import { useLoginLocalStorage } from '@/utils/localstorage'
import { RaMessage } from '@capybara-plus/vue'

const loginLocalStorage = useLoginLocalStorage()

export enum QRCodeStatus {
  WAIT_SCAN = 801,
  SCAN_SUCCESS = 802,
  AUTH_SUCCESS = 803,
  EXPIRED = 800,
  OTHER,
}

export const useLoginStore = defineStore('login', () => {
  const qrImg = ref('') // 二维码图片 base64 格式
  const qrStatus = ref<QRCodeStatus>(QRCodeStatus.OTHER) // 二维码是否过期
  const userInfo = computed(() => loginLocalStorage.getUser()) // 用户信息
  let timer: any = null // 轮询检查二维码状态的定时器

  // 获取二维码及二维码登录逻辑
  async function getQRCode() {
    stopCheck() // 如果有则先停止上一次的检查
    try {
      // 获取 unikey
      const {
        data: { unikey },
      } = (await loginApi.getKey()) as any
      // 根据 unikey 获取二维码
      const {
        data: { qrimg },
      } = (await loginApi.getQR(unikey, true)) as any
      qrImg.value = qrimg
      timer = setInterval(async () => {
        const statusRes = (await loginApi.checkQR(unikey)) as any
        const { code } = statusRes
        if (code === 801) {
          console.log('等待扫描')
          qrStatus.value = QRCodeStatus.WAIT_SCAN
        } else if (code === 802) {
          console.log('扫描成功')
          qrStatus.value = QRCodeStatus.SCAN_SUCCESS
        } else if (code === 803) {
          console.log('授权成功')
          qrStatus.value = QRCodeStatus.AUTH_SUCCESS
          clearInterval(timer!)
          const { cookie } = statusRes // 拿到 cookie
          await getLoginStatus(cookie) // 获取登录状态
          loginLocalStorage.setCookie(cookie) // 持久化存储 cookie
          RaMessage.success('登录成功')
        } else if (code === 800) {
          console.log('二维码已过期')
          qrStatus.value = QRCodeStatus.EXPIRED
          clearInterval(timer!)
        } else {
          throw new Error(statusRes)
        }
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  // 获取登录状态
  async function getLoginStatus(cookie?: string) {
    try {
      cookie = cookie || (loginLocalStorage.getCookie() ?? '')
      const {
        data: { account, profile },
      } = await loginApi.getLoginStatus(cookie)

      loginLocalStorage.setUser({
        account,
        profile,
      })
    } catch (error) {
      qrStatus.value = QRCodeStatus.OTHER
      console.log(error)
    }
  }

  // 停止检查二维码状态
  const stopCheck = () => {
    clearInterval(timer)
    qrStatus.value = QRCodeStatus.WAIT_SCAN
  }

  return {
    qrImg,
    getQRCode,
    getLoginStatus,
    qrStatus,
    stopCheck,
    userInfo,
  }
})
