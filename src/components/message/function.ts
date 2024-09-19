import { createMessageInstance, MessageOptions } from './instance'

const types = ['success', 'warning', 'info', 'error']
type UseMessage = {
  (options: MessageOptions): void
} & {
  [K in (typeof types)[number]]: (
    content: string,
    options?: MessageOptions
  ) => void
}

const useMessage = ((options: MessageOptions) => {
  return createMessageInstance(options)
}) as UseMessage

for (const type of types) {
  useMessage[type] = (content: string, options?: MessageOptions) => {
    return createMessageInstance({
      type,
      content,
      ...options,
    })
  }
}

export default useMessage
