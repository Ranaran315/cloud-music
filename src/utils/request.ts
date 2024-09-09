import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
  timeout: 60000,
})

// 请求拦截器
server.interceptors.request.use(
  (config) => {
    // 添加请求头
    // config.params = {
    //   ...config.params,
    //   realIP: '116.25.146.177',
    // }
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
    timestamp,
    ...config
  }: AxiosRequestConfig<any> & {
    resetUrl?: string
    timestamp?: boolean
  }): Promise<AxiosResponse<any, any>['data']> => {
    url = resetUrl ? resetUrl : url ? baseURL + '/' + url : baseURL
    const request: any = { url, ...config }
    if (timestamp)
      request.params = {
        ...request.params,
        timestamp: new Date().getTime(),
      }
    return server(request)
  }
}

export default useRequest
