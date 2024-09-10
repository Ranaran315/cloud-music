/**
 * format number to 'xx万' or 'xx亿' or 'xx千' or original number
 * @param num
 * @returns
 */
export const formatCount = (num?: number) => {
  if (!num) return 0
  if (num > 100000000) {
    return `${(num / 100000000).toFixed(2)}亿`
  } else if (num > 10000) {
    return `${(num / 10000).toFixed(2)}万`
  } else if (num > 1000) {
    return `${(num / 1000).toFixed(2)}千`
  } else {
    return num
  }
}

/**
 * formate time to 'xx年前' or 'xx月前' or 'xx天前' or 'xx小时前' or 'xx分钟前'
 * @param time
 * @returns
 */
export const formatTime = (time?: number | string) => {
  if (!time) return '刚刚'
  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  if (typeof time === 'string') {
    time = new Date(time).getTime()
  }

  const pastedTime = currentTime - time // 过去的时间

  let timeUnit = 1000 * 60 * 60 * 24 * 30 * 12

  if (pastedTime > timeUnit) {
    return `${Math.floor(pastedTime / timeUnit)}年前`
  } else if (pastedTime > (timeUnit /= 12)) {
    return `${Math.floor(pastedTime / timeUnit)}月前`
  } else if (pastedTime > (timeUnit /= 30)) {
    return `${Math.floor(pastedTime / timeUnit)}天前`
  } else if (pastedTime > (timeUnit /= 24)) {
    return `${Math.floor(pastedTime / timeUnit)}小时前`
  } else if (pastedTime > (timeUnit /= 60)) {
    return `${Math.floor(pastedTime / timeUnit)}分钟前`
  } else {
    return '刚刚'
  }
}

/**
 * format duration to 'xx:xx
 * @param duration 毫秒时间单位
 * @returns
 */
export const formatDuration = (duration?: number) => {
  if (!duration) return '00:00'
  const seconds = duration / 1000
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const second = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${second}`
}

export const formatName = (arr: any[], filed: string) => {
  return arr.map((item) => item[filed]).join(' / ')
}

export const formatAlias = (alias: string[]) => alias.join(' / ')
