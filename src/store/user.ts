import { userApi } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { User } from '@/utils/type'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | any>({}) // 用户信息
  const profile = computed(() => userInfo.value?.profile)

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const {
        account: { id },
      } = await userApi.getAccount() // 登陆后可调用该接口获取用户 id
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
