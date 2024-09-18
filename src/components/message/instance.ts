import { h, render } from 'vue'
import CloudMessage from './message.vue'

export interface MessageOptions {
  type?: string
  content: string
  duration?: number
}

export const createMessageInstance = (options: MessageOptions) => {
  const { type, content, duration } = options
  const root = document.createElement('div')
  const message = h(CloudMessage, { type, content, duration })
  render(message, root)
  setTimeout(() => {
    render(null, root)
  }, 0)
}
