import useRequest from '@/utils/request'

const request = useRequest('banner')

export default {
  // 获取轮播图
  getBannerList() {
    return request({})
  },
  getIcon() {
    return request({
      resetUrl: '/homepage/dragon/ball',
    })
  },
}
