import { useMessage } from '@/components'
import { ref } from 'vue'

export const useAsyncTryCatch = async (
  tryCallback: () => Promise<void>,
  catchCallback?: (() => void) | null,
  finallyCallback?: () => void
) => {
  const loading = ref(false)

  try {
    loading.value = true
    await tryCallback()
  } catch (error: any) {
    if (catchCallback) {
      catchCallback()
    } else {
      const { status } = error
      if (status === 301) return // 未登录
      useMessage.error(`Error: ${error}`)
    }
  } finally {
    finallyCallback?.()
    loading.value = false
  }

  return loading
}
