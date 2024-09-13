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
  // 获取歌手简要百科
  getProducation(id: number) {
    return request({
      resetUrl: '/ugc/artist/get',
      params: {
        id,
      },
    })
  },
  // 获取相似歌手
  getSimi(id: number) {
    return request({
      resetUrl: 'simi/artist',
      params: {
        id,
      },
    })
  },
  // 获取歌手专辑
  getAlbums(id: number, limit = 30, offset = 0) {
    return request({
      url: 'album',
      params: {
        id,
        limit,
        offset,
      },
    })
  },
  // 获取歌手mv
  getMV(id: number) {
    return request({
      url: 'mv',
      params: {
        id,
      },
    })
  },
  // 获取歌手歌曲
  getSongs(id: number, limit = 30, offset = 0) {
    return request({
      url: 'songs',
      params: {
        id,
        limit,
        offset,
      },
    })
  },
}
