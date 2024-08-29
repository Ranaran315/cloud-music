import useRequest from '@/utils/request'

const request = useRequest('user')

export default {
  // 根据用户 id 获取用户信息
  getUserDetail(id: string) {
    return request({
      url: 'detail',
      params: {
        uid: id,
      },
    })
  },
  // 获取用户账号信息
  getAccount() {
    return request({
      url: 'account',
    })
  },
  // 获取用户歌单、收藏等数量信息
  getSubcount() {
    return request({
      url: 'subcount',
    })
  },
  // 获取用户等级信息
  // 包含当前登录天数、听歌次数
  // 下一等级需要的登录天数和听歌次数、当前等级进度
  // 对应 https://music.163.com/#/user/level
  getUserLevel() {
    return request({
      url: 'level',
    })
  },
  // 根据用户 id 获取用户歌单
  getUserPlaylist(id: string, limit: number = 30, offset: number = 0) {
    return request({
      url: 'playlist',
      params: {
        uid: id,
        limit,
        offset,
      },
    })
  },
}
