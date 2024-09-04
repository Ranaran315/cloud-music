export function parseLyric(lyric: string) {
  const lines = lyric.split('\n')
  const result = []
  const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const globalReg = new RegExp(reg, 'g')
  const singleReg = new RegExp(reg)
  for (const line of lines) {
    const time = line.match(globalReg)
    if (!time) continue
    const content = line.replace(globalReg, '').trim()
    for (const t of time) {
      const timeArr = t.match(singleReg)
      if (!timeArr) continue
      const time =
        (parseInt(timeArr[1]) * 60 +
          parseInt(timeArr[2]) +
          parseInt(timeArr[3]) / 1000) *
        1000
      result.push({ time: parseInt(time.toFixed(0)), content })
    }
  }
  return result
}
