import useRequest from '@/utils/request'

const request = useRequest('search')

interface SearchParams {
  keywords: string
  limit?: number
  offset?: number
  type?: number
}

export default {
  // 搜索
  search({ keywords, limit = 30, offset = 0, type = 1 }: SearchParams) {
    return request({
      resetUrl: 'search',
      params: {
        keywords,
        limit,
        offset,
        type,
      },
    })
  },
  // 获取默认搜索关键词
  default() {
    return request({
      url: 'default',
    })
  },
  // 获取热搜列表
  hot() {
    return request({
      url: 'hot',
    })
  },
  // 获取热搜列表（详情）
  hotDetail() {
    return request({
      url: 'hot/detail',
    })
  },
  // 根据关键词获取搜索建议
  suggest(keywords: string) {
    return request({
      url: 'suggest',
      params: {
        keywords,
      },
    })
  },
}
