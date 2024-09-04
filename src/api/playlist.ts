import useRequest from '@/utils/request'

const request = useRequest('playlist')

export default {
  /**
   * 根据 id 获取歌单详情
   *  - id: 歌单id
   *  - name: 歌单名
   *  - coverImgUrl: 歌单封面
   *  - createTime: 创建时间
   *  - updateTime: 更新时间
   *  - trackUpdateTime: 歌曲更新时间
   *  - playCount: 播放次数
   *  - trackCount: 歌曲数量
   *  - subscribedCount: 收藏次数
   *  - shareCount: 分享次数
   *  - commentCount: 评论次数
   *  - description: 歌单描述
   *  - tags: 歌单标签
   *  - titleImageUrl: 标题图片
   *  - detailPageTitle: 详情页标题
   *  - subscribers：最近收藏者（默认8个）
   *  - creator: 创建者
   *   - userId: 用户id
   *   - avatarUrl: 用户头像
   *   - nickname: 用户昵称
   *  - privileges：vip 歌曲列表
   *  - subscribed: 是否已收藏
   * @param id 歌单id
   * @returns
   */
  getPlaylistDetail(id: number | string) {
    return request({
      url: 'detail',
      params: {
        id,
      },
    })
  },
  /**
   * 获取歌单所有歌曲
   * @param id 歌单 id
   * @returns
   * - id: number
   * - name: string
   * - ar: {
   *    id: number
   *    name: string
   *  }[]
   * - al: {
   *    id: number
   *    name: string
   *    picUrl: string
   *  }
   * - alia: string[]
   * - publishTime: number
   * - dt: number
   * - isLiked: boolean
   */
  getPlaylistAllTracks(id: number | string) {
    return request({
      url: 'track/all',
      params: {
        id,
      },
    })
  },
}
