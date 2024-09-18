import { useMessage } from '@/components'
import { ref } from 'vue'

export const useTryCatch = async (
  tryCallback: () => Promise<void>,
  catchCallback?: (() => void) | null,
  finallyCallback?: () => void
) => {
  const loading = ref(false)

  try {
    loading.value = true
    await tryCallback()
  } catch (error) {
    useMessage({
      type: 'error',
      content: `Error: ${error}`,
    })
    catchCallback?.()
  } finally {
    finallyCallback?.()
    loading.value = false
  }

  return loading
}
