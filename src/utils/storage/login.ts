const cookieKey = 'cookie'
const userKey = 'user'

const useLoginLocalStorage = () => {
  // cookie 信息
  function setCookie(cookie: string) {
    localStorage.setItem(cookieKey, cookie)
  }
  function getCookie() {
    return localStorage.getItem(cookieKey)
  }

  // 用户信息
  function setUser(user: { account: any; profile: any }) {
    localStorage.setItem(userKey, JSON.stringify(user))
  }
  function getUser() {
    return JSON.parse(localStorage.getItem(userKey) || '{}')
  }

  function clear() {
    localStorage.removeItem(cookieKey)
    localStorage.removeItem(userKey)
  }

  return {
    setCookie,
    getCookie,
    setUser,
    getUser,
    clear,
  }
}

export default useLoginLocalStorage
