import useRequest from '@/utils/request'

const request = useRequest('artists')

export default {
  getBaseInfo(id: number) {
    return request({
      params: {
        id,
      },
    })
  },
}
