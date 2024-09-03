import useRequest from '@/utils/request'

const request = useRequest('recommend')

export default {
  /**
   * 获取推荐歌单
   *  - id: 歌单id
   */
  getRecommendPlaylist() {
    return request({
      url: 'resource',
    })
  },
  /**
   * 获取推荐歌曲
   * - id: 歌曲id
   * - name: 歌曲名
   * - ar: 歌手（数组）
   *   - id: 歌手id
   *   - name: 歌手名
   * - al: 专辑
   *  - id: 专辑id
   *  - name: 专辑名
   *  - picUrl: 专辑封面
   * - alia: 别名（数组）
   * - publishTime: 发行时间
   * - dt: 时长（毫秒）
   */
  getRecommendSongs() {
    return request({
      url: 'songs',
    })
  },
}
