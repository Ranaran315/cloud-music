import useRequest from '@/utils/request'

const request = useRequest('login')

export default {
  getKey() {
    return request({
      url: 'qr/key',
    })
  },
  getQR(key: string, qrimg?: boolean) {
    return request({
      url: 'qr/create',
      params: {
        key,
        qrimg,
      },
    })
  },
}
