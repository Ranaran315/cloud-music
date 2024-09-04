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
   * 获取歌曲详情
   * @param id 歌曲 id
   * @returns
   * songs: Song[]
   */
  getSongDetail(id: number | number[]) {
    return request({
      url: 'detail',
      params: {
        ids: idToids(id),
      },
    })
  },
  /**
   * 获取歌曲 url
   * data: Array
   * - id: 歌曲 id
   * - url: 歌曲的 url
   * - time: 歌曲时长
   */
  getSongUrl(id: number | number[], br: number = 999000) {
    return request({
      url: 'url',
      params: {
        id: idToids(id),
        br,
      },
    })
  },
  // 获取歌曲url（新版）
  getSongUrlV1(id: number | number[], level: SongLevel = 'sky') {
    return request({
      url: 'url/v1',
      params: {
        id: idToids(id),
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
  /**
   * 获取歌曲歌词
   * @param id 歌曲 id
   * @returns
   * - lrc：歌词
   *  - version: 歌词版本
   *  - lyric: 歌词
   * - klyric
   * - tlyric： 翻译歌词
   * - romalyric： 罗马音歌词
   */
  getSongLyric(id: number) {
    return request({
      resetUrl: 'lyric',
      params: {
        id,
      },
    })
  },
}

function idToids(id: number | number[]) {
  let ids: string
  if (Array.isArray(id)) {
    ids = id.join(',')
  } else {
    ids = id.toString()
  }
  return ids
}
