import { createMessageInstance, MessageOptions } from './instance'

const useMessage = (options: MessageOptions) => {
  return createMessageInstance(options)
}

export default useMessage
