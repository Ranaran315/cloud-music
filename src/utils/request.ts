import axios, { AxiosRequestConfig } from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
})

// 请求拦截器
server.interceptors.request.use(
  (config) => {
    config.headers['withCredentials'] = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  (res) => {
    const {
      data: { code, data },
    } = res
    console.log('response', res)
    if (code == 200) {
      return Promise.resolve(data)
    } else {
      return Promise.reject({ code, data })
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

const useRequest = (baseURL: string) => {
  return ({ url, ...config }: AxiosRequestConfig<any>) => {
    return server({
      url: `${baseURL}/${url}`,
      ...config,
    })
  }
}

export default useRequest
