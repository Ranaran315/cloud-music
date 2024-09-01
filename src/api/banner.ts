import useRequest from '@/utils/request'

const request = useRequest('banner')

export default {
  // 获取轮播图
  getBannerList() {
    return request({
      params: {
        type: 0, // 0: pc 1: android 2: iphone 3 ipad
      },
    })
    /**
     * {code, banners}
     * banners: [
     *  {
     *    imageUrl, // 图片地址
     *    targetId, // 跳转id
     *    targetType, // 跳转类型
     *    titleColor, // 标题颜色
     *  typeTitle, // 类型标题
     *  }
     * ]
     */
  },
  getIcon() {
    return request({
      resetUrl: '/homepage/dragon/ball',
    })
  },
}
