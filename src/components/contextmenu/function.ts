import createInstance, { type ContextMenus } from './instance'

export const showContextMenu = (e: PointerEvent, menu: ContextMenus[]) => {
  e.preventDefault()
  const { clientX: x, clientY: y } = e
  createInstance({
    x,
    y,
    menu,
  })
}
