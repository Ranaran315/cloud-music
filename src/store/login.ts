import { defineStore } from 'pinia'
import loginApi from '@/api/login'
import { ref } from 'vue'
import { useLoginLocalStorage } from '@/utils/localstorage'

const loginLocalStorage = useLoginLocalStorage()

export const useLoginStore = defineStore('login', () => {
  const qrImg = ref('') // 二维码图片 base64 格式
  const qrIsExpired = ref(false) // 二维码是否过期
  let timer: NodeJS.Timeout | null = null // 轮询检查二维码状态的定时器

  // 获取二维码及二维码登录逻辑
  async function getQRCode() {
    qrIsExpired.value = false // 重置二维码过期状态
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
      // 轮询检查二维码状态
      if (timer) clearInterval(timer)
      timer = setInterval(async () => {
        const statusRes = (await loginApi.checkQR(unikey)) as any
        const { code } = statusRes
        if (code === 801) {
          console.log('等待扫码')
        } else if (code === 802) {
          console.log('扫码成功，等待确认')
        } else if (code === 803) {
          console.log('授权登录成功')
          clearInterval(timer!)
          const { cookie } = statusRes // 拿到 cookie
          await getLoginStatus(cookie) // 获取登录状态
          loginLocalStorage.setCookie(cookie) // 持久化存储 cookie
        } else if (code === 800) {
          console.log('二维码已过期')
          qrIsExpired.value = true
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
      console.log(error)
    }
  }

  return {
    qrImg,
    getQRCode,
    getLoginStatus,
  }
})
