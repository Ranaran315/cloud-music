import { createVNode, render } from 'vue'
import ContextMenu from './contextmenu.vue'

interface ContextMenuOptions {
  x: number
  y: number
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
    render(null, container)
    pending = false
  }
}

export default createInstance
