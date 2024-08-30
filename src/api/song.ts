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
  // 获取歌曲url
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
  getSongUrlV1(id: string | string[], level: SongLevel = 'standard') {
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
}
