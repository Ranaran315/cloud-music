const cookieKey = 'cookie'

export const useLoginLocalStorage = () => {
  function setCookie(cookie: string) {
    localStorage.setItem(cookieKey, cookie)
  }

  function getCookie() {
    return localStorage.getItem(cookieKey)
  }

  return {
    setCookie,
    getCookie,
  }
}
