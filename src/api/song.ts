import useRequest from '@/utils/request'

const request = useRequest('song')

type SongLevel =
  | 'standard'
  | 'higher'
  | 'exhigh'
  | 'lossless'
  | 'hireshires'
  | 'jyeffect'
  | 'sky'
  | 'jymaster'

export default {
  /**
   * 获取歌曲 url
   * - id: 歌曲 id
   * - url: 歌曲的 url
   * - time: 歌曲时长
   */
  getSongUrl(id: string | string[], br: number = 999000) {
    if (Array.isArray(id)) {
      id = id.join(',')
    }
    return request({
      url: 'url',
      params: {
        id,
        br,
      },
    })
  },
  // 获取歌曲url（新版）
  getSongUrlV1(id: string | string[], level: SongLevel = 'sky') {
    if (Array.isArray(id)) {
      id = id.join(',')
    }
    return request({
      url: 'url/v1',
      params: {
        id,
        level,
      },
    })
  },
  /**
   * 喜欢音乐
   * @param id 音乐id
   * @param like 是否喜欢
   * @returns
   */
  like(id: number, like: boolean) {
    return request({
      method: 'post',
      resetUrl: 'like',
      params: {
        id,
        like,
      },
    })
  },
  /**
   * 获取用户喜欢的音乐列表
   * @param uid 用户 id
   * @returns
   * - ids: number[]
   */
  getSongLikedList(uid: number) {
    return request({
      resetUrl: 'likelist',
      params: {
        uid,
      },
    })
  },
}
