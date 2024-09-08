/**
 * @description 解析歌词
 * @param lyric lyric形式的歌词
 * @returns
 * lyric 形式的歌词中时间戳的格式可能为 [00:00.000] 或 [00:00:00]
 */
export function parseLyric(lyric: string) {
  const lines = lyric.split('\n')
  const result = []
  const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/ // [00:00.000]
  const reg2 = /\[(\d{2}):(\d{2}):(\d{2})\]/ // [00:00:00]
  let globalReg
  let singleReg
  for (const line of lines) {
    globalReg = new RegExp(reg, 'g')
    singleReg = new RegExp(reg)
    let time = line.match(globalReg)
    if (!time) {
      // 如果没有匹配到则切换匹配模式
      globalReg = new RegExp(reg2, 'g')
      singleReg = new RegExp(reg2)
      time = line.match(globalReg)
      if (!time) continue
    }
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
