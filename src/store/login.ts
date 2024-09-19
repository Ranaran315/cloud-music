import { defineStore } from 'pinia'
import loginApi from '@/api/login'
import { ref, nextTick } from 'vue'
import { LoginUser } from '@/utils/type'
import { useAsyncTryCatch } from '@/utils/async'
import { captchaApi } from '@/api'
import { useMessage } from '@/components'

export enum QRCodeStatus {
  WAIT_SCAN = 801,
  SCAN_SUCCESS = 802,
  AUTH_SUCCESS = 803,
  EXPIRED = 800,
  OTHER,
}

const key = 'LOGIN'
export const useLoginStore = defineStore(
  key,
  () => {
    const qrImg = ref('') // 二维码图片 base64 格式
    const qrStatus = ref<QRCodeStatus>(QRCodeStatus.OTHER) // 二维码是否过期
    const cookie = ref('') // cookie
    const userInfo = ref<Partial<LoginUser>>({}) // 用户信息
    const isLogined = ref(false)
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
            loginSuccess(statusRes)
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
    async function getLoginStatus(c?: string) {
      try {
        c = c || cookie.value
        const {
          data: { account, profile },
        } = await loginApi.getLoginStatus(c)
        userInfo.value = { ...account, ...profile }
        if (account || profile) {
          isLogined.value = true
        } else {
          isLogined.value = false
          throw new Error('登录状态异常')
        }
      } catch (error) {
        qrStatus.value = QRCodeStatus.OTHER
        isLogined.value = false
        console.log(error)
      }
    }

    // 停止检查二维码状态
    const stopCheck = () => {
      clearInterval(timer)
      qrStatus.value = QRCodeStatus.WAIT_SCAN
    }

    // 退出登录
    const logout = async () => {
      try {
        await loginApi.logout()
        cookie.value = ''
        userInfo.value = {}
      } catch (error) {
        console.log(error)
      } finally {
        isLogined.value = false
      }
    }

    // 手机验证码登录
    const loginByPhone = (phone: string, captcha: string) => {
      useAsyncTryCatch(
        async () => {
          await captchaApi.verifyCellPhoneCaptcha(phone, captcha)
          const res = await loginApi.cellPhoneLogin(phone, captcha)
          loginSuccess(res)
        },
        () => {
          useMessage.error('验证码错误')
        }
      )
    }

    // 登录成功后的逻辑
    const loginSuccess = (result: any) => {
      useAsyncTryCatch(async () => {
        const { cookie: c } = result // 拿到 cookie
        await getLoginStatus(c) // 获取登录状态
        cookie.value = c // 持久化存储 cookie
        nextTick(() => {
          window.location.reload() // 刷新页面
        })
      })
    }

    return {
      qrImg,
      getQRCode,
      qrStatus,
      stopCheck,
      userInfo,
      isLogined,
      logout,
      getLoginStatus,
      cookie,
      loginByPhone,
    }
  },
  {
    persist: {
      key,
      paths: ['cookie', 'userInfo'],
    },
  }
)
