const cookieKey = 'cookie'

export const useLoginLocalStorage = () => {
  // cookie 信息
  function setCookie(cookie: string) {
    localStorage.setItem(cookieKey, cookie)
  }

  function getCookie() {
    return localStorage.getItem(cookieKey)
  }

  // 用户信息
  function setUser(user: { account: any; profile: any }) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  function getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  return {
    setCookie,
    getCookie,
    setUser,
    getUser,
  }
}
