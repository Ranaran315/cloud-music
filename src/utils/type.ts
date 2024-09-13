export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

// 用户接口
export interface Profile {
  avatarUrl: string // 头像
  backgroundUrl: string // 背景
  birthday: number // 生日
  city: number // 城市
  province: number // 省份
  defaultAvatar: boolean // 是否默认头像
  followed: boolean // 是否关注
  gender: number // 性别
  nickname: string // 昵称
  signature: string // 签名
  userId: number // 用户 id
  userType: number // 用户类型
  vipType: number // vip 类型
}
// 账户信息
export interface Account {
  id: number
  status: number
}
// 登录后返回的用户登录信息
export type LoginUser = Account &
  Profile & {
    lastLoginIP: string // 最后登录 IP
    lastLoginTime: number // 最后登录时间
  }
// 用户详情
export interface User {
  level: number // 等级
  listenSongs: number // 听歌数量
  createTime: number // 创建时间
  profile: Profile & {
    followeds: number // 粉丝数
    follows: number // 关注数
    playlistCount: number // 歌单数量
  } // 用户信息
}

// 歌单接口
export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  playCount?: number
  detailPageTitle: string
  createTime?: string
  creator?: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}
// 歌单详情接口
export interface PlaylistDetail {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  updateTime: number
  trackUpdateTime: number
  playCount: number
  subscribedCount: number
  shareCount: number
  commentCount: number
  trackCount: number
  description: string
  tags: string[]
  titleImageUrl: string
  detailPageTitle: string
  subscribers: {
    userId: number
    avatarUrl: string
    nickname: string
  }[]
  creator: {
    userId: number
    avatarUrl: string
    nickname: string
  }
}

// 歌曲接口
export interface Song {
  id: number
  name: string
  ar: {
    id: number
    name: string
  }[]
  al: {
    id: number
    name: string
    picUrl: string
  }
  alia: string[]
  publishTime: number
  dt: number
  isLiked: boolean
}
// 歌曲详情接口（带有url）
export interface SongWithUrl extends Song {
  url: string
}
// 歌词接口
export interface Lyric {
  time: number
  content: string
}

// 艺人接口
export interface Artist {
  id: number
  name: string
  alias: string[]
  picUrl: string
  img1v1Url?: string
  albumSize?: number
  mvSize?: number
  musicSize?: number
  followed?: boolean
  identityIconUrl?: string
  briefDesc?: string
  publishTime?: number
  fansCnt?: number
  followCnt?: number
}

// 专辑接口
export interface Album {
  id: number
  name: string
  picUrl: string
  publishTime: number
  description: string
  tags: string[]
  company: string
  artists: Artist[]
}

// 查询类型接口
export enum SearchType {
  Synthesis = 1018,
  Songs = 1,
  Playlist = 1000,
  Artists = 100,
  Sound = 2000,
  Podcast = 1009,
  Lyrics = 1006,
  Album = 10,
  MV = 1014,
  User = 1002,
}
