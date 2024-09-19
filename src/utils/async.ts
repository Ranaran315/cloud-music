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
  } catch (error) {
    if (catchCallback) {
      catchCallback()
    } else {
      useMessage.error(`Error: ${error}`)
    }
  } finally {
    finallyCallback?.()
    loading.value = false
  }

  return loading
}
