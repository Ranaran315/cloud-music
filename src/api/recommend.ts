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
   * - data
   *   - dailySongs: Song[]
   */
  getRecommendSongs() {
    return request({
      url: 'songs',
    })
  },
}
