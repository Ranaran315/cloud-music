import axios, { AxiosRequestConfig } from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  timeout: 60000,
})

const isCache = false

// 请求拦截器
server.interceptors.request.use(
  (config) => {
    // 是否缓存
    if (!isCache) {
      config.params = {
        ...config.params,
        timestamp: Date.now(),
      }
    }
    // 添加请求头
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  (res) => {
    const { code, data } = res as any
    if (code && code == 301) {
      console.log('需要登录')
    }
    return data
  },
  (err) => {
    return Promise.reject(err)
  }
)

const useRequest = (baseURL: string) => {
  return ({
    url,
    resetUrl,
    ...config
  }: AxiosRequestConfig<any> & { resetUrl?: string }) => {
    url = resetUrl ? resetUrl : url ? baseURL + '/' + url : baseURL
    return server({
      url,
      ...config,
    })
  }
}

export default useRequest
