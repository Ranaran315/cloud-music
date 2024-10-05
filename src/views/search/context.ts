import { Component, InjectionKey, reactive } from 'vue'
import Songs from './songs.vue'
import Artists from './artists.vue'
import Playlist from './playlist.vue'
import Albums from './albums.vue'
import Synthesis from './synthesis.vue'
import { useRoute, useRouter } from 'vue-router'
import { SearchType } from '@/utils/interface'

interface SearchContext {
  state: {
    result: any
    type: {
      [k in SearchType]: boolean
    }
  }
  tabs: Array<{
    name: string
    tab: string
    component?: Component
  }>
  setResult: (result: any) => void
  setLoading: (type: SearchType, loading: boolean) => void
  changeTab: (type: SearchType) => void
}

export const SearchContextKey: InjectionKey<SearchContext> = Symbol('search')

export function useSearchContext() {
  const route = useRoute()
  const router = useRouter()
  const state = reactive({
    result: {},
    type: {
      [SearchType.Synthesis]: false,
      [SearchType.Songs]: false,
      [SearchType.Playlist]: false,
      [SearchType.Artists]: false,
      [SearchType.Sound]: false,
      [SearchType.Podcast]: false,
      [SearchType.Lyrics]: false,
      [SearchType.Album]: false,
      [SearchType.MV]: false,
      [SearchType.User]: false,
    },
  })
  const tabs = [
    {
      name: '1018',
      tab: '综合',
      component: Synthesis,
    },
    {
      name: '1',
      tab: '单曲',
      component: Songs,
    },
    {
      name: '1000',
      tab: '歌单',
      component: Playlist,
    },
    {
      name: '100',
      tab: '歌手',
      component: Artists,
    },
    {
      name: '2000',
      tab: '声音',
    },
    {
      name: '1009',
      tab: '播客',
    },
    {
      name: '1006',
      tab: '歌词',
    },
    {
      name: '10',
      tab: '专辑',
      component: Albums,
    },
    {
      name: '1014',
      tab: 'MV',
    },
    {
      name: '1002',
      tab: '用户',
    },
  ]

  const setResult = (result: any) => {
    state.result = result
  }

  const setLoading = (type: SearchType, loading: boolean) => {
    ;(state.type as any)[type] = loading
  }

  const changeTab = (type: SearchType) => {
    router.replace({
      query: {
        ...route.query,
        type,
      },
    })
  }

  return {
    state,
    setResult,
    setLoading,
    tabs,
    changeTab,
  }
}
