import useRequest from '@/utils/request'

const request = useRequest('login')

export default {
  // 获取 unikey
  getKey() {
    return request({
      url: 'qr/key',
    })
  },
  // 根据 unikey 获取二维码
  getQR(key: string, qrimg?: boolean) {
    return request({
      url: 'qr/create',
      params: {
        key,
        qrimg,
      },
    })
  },
  // 根据 unikey 检查二维码状态
  checkQR(key: string) {
    return request({
      url: 'qr/check',
      params: {
        key,
      },
    })
  },
  // 根据 cookie 获取登录状态
  getLoginStatus(cookie: string) {
    return request({
      url: `status`,
      method: 'post',
      data: {
        cookie,
      },
    })
  },
  // 退出登录
  logout() {
    return request({
      resetUrl: 'logout',
    })
  },
}
