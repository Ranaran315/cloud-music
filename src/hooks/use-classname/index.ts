const defaultNameSpace = 'cloud' // default namespace

const generateClassName = (
  useNameSpace: boolean,
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string
) => {
  let className
  if (useNameSpace) className = `${defaultNameSpace}-${block}`
  else className = block
  if (blockSuffix) {
    className += `-${blockSuffix}`
  }
  if (element) {
    className += `__${element}`
  }
  if (modifier) {
    className += `--${modifier}`
  }
  return className
}

export const useClassName = (block: string, useNameSpace: boolean = true) => {
  const b = (blockSuffix?: string) =>
    generateClassName(useNameSpace, block, blockSuffix, '', '')

  const e = (element?: string) =>
    element ? generateClassName(useNameSpace, block, '', element, '') : ''

  const m = (modifier?: string) =>
    modifier ? generateClassName(useNameSpace, block, '', '', modifier) : ''

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? generateClassName(useNameSpace, block, blockSuffix, element, '')
      : ''

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? generateClassName(useNameSpace, block, blockSuffix, '', modifier)
      : ''

  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? generateClassName(useNameSpace, block, '', element, modifier)
      : ''

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? generateClassName(useNameSpace, block, blockSuffix, element, modifier)
      : ''

  const is = (state?: string | boolean, name?: string) => {
    if (typeof state === 'string') return state ? `is-${state}` : ''
    if (typeof state === 'boolean') return state ? `is-${name}` : ''
  }

  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  }
}
