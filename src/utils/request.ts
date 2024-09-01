import axios, { AxiosRequestConfig } from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
})

const isCache = false

// 请求拦截器
server.interceptors.request.use(
  (config) => {
    console.log('request', config)

    // 是否缓存
    if (!isCache) {
      config.params = {
        ...config.params,
        timestamp: new Date(),
      }
    }

    // 添加请求头
    config.headers['withCredentials'] = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  (res) => {
    console.log('response', res)
    return res.data
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
