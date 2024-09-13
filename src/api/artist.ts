import useRequest from '@/utils/request'

const request = useRequest('artist')

export default {
  /**
   * 获取歌手基本信息
   * @param id
   * @returns
   * - artist: Artist
   * - hotSongs: Song[]
   */
  getBaseInfo(id: number) {
    return request({
      resetUrl: 'artists',
      params: {
        id,
      },
    })
  },
  /**
   * 获取歌手粉丝关注数
   * @param id
   * @returns
   * - data
   *  - fansCnt: 粉丝数
   *  - followCnt: 关注数
   */
  getFans(id: number) {
    return request({
      url: 'follow/count',
      params: {
        id,
      },
    })
  },
  getDesc(id: number) {
    return request({
      resetUrl: '/ugc/artist/get',
      params: {
        id,
      },
    })
  },
}
