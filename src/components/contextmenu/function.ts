import createInstance, {
  ContextMenuOptions,
  type ContextMenus,
} from './instance'

export const showContextMenu = (
  e: PointerEvent | MouseEvent,
  menu: ContextMenus[],
  options?: ContextMenuOptions
) => {
  e.preventDefault()
  const { clientX: x, clientY: y } = e
  return createInstance({
    x,
    y,
    menu,
    ...options,
  })
}

export type { ContextMenuInstance, ContextMenuOptions } from './instance'
