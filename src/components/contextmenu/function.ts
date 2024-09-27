import createInstance from './instance'

export const showContextMenu = (e: PointerEvent) => {
  e.preventDefault()
  const { clientX: x, clientY: y } = e
  createInstance({
    x,
    y,
  })
}
