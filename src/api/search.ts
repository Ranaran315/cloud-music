import useRequest from '@/utils/request'

const request = useRequest('search')

interface SearchParams {
  keywords: string
  limit?: number
  offset?: number
  type?: number
}

export default {
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
  /**
   * 获取热搜列表（详情）
   * @returns
   * - data: Array
   *  - searchWord: 搜索词
   */
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
  /**
   * 搜索
   * @param params { keywords, limit, offset, type }
   * - keywords: 关键词
   * - limit: 返回数量
   * - offset: 偏移量
   * - type: 搜索类型
   *  - 1: 单曲
   *  - 10: 专辑
   *  - 100: 歌手
   *  - 1000: 歌单
   *  - 1002: 用户
   *  - 1004: MV
   *  - 1006: 歌词
   *  - 1009: 电台
   *  - 1014: 视频
   *  - 1018: 综合
   *  - 2000: 声音
   * @returns
   */
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
  /**
   * 多重搜索
   */
  searchMultimatch(keywords: string) {
    return request({
      url: 'multimatch',
      params: {
        keywords,
      },
    })
  },
}
