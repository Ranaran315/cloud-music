import { userApi } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLoginStore } from './login'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<any>({}) // 用户信息
  const profile = computed(() => userInfo.value?.profile)

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      await useLoginStore().getLoginStatus()
      const {
        account: { id },
      } = (await userApi.getAccount()) as any
      const res = await userApi.getUserDetail(id)
      userInfo.value = res
    } catch (error) {
      console.log(error)
    }
  }

  return {
    userInfo,
    getUserInfo,
    profile,
  }
})
