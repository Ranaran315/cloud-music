export const rgbToHex = (rgb: [number, number, number]) => {
  return (
    '#' +
    rgb
      .map((color) => {
        return color.toString(16).padStart(2, '0')
      })
      .join('')
  )
}
