import { type Component, createVNode, render } from 'vue'
import ContextMenu from './contextmenu.vue'

export interface ContextMenus {
  icon: Component
  text: string
  onChoose?: () => void
}

export interface ContextMenuOptions {
  x?: number
  y?: number
  menu?: ContextMenus[]
  onClose?: () => void
}

export interface ContextMenuInstance {
  close: () => void
}

let pending = false // 记录是否已经创建了一个右键菜单
const container = document.createElement('div')
const createInstance = (options: ContextMenuOptions) => {
  if (pending) destory()
  const vnode = createVNode(ContextMenu, {
    ...options,
    onDestory: destory,
  })
  render(vnode, container)
  document.body.appendChild(container.firstChild!)
  pending = true

  function destory() {
    options.onClose?.()
    render(null, container)
    pending = false
  }

  return {
    close: () => destory(),
  }
}

export default createInstance
