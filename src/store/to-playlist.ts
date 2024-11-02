import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useIndexDB } from '@/hooks'
import { IDBPObjectStore } from 'idb'

const useDB = useIndexDB('to-playlist')

const key = 'TO_PLAYLIST'
const stateKey = 'songlist'
export const useToPlaylistStore = defineStore(key, () => {
  // 播放列表
  const list = ref<Array<number>>([])

  /**
   * @description 初始化
   */
  const init = () => {
    useDB(async (store) => {
      const result = await store.get(stateKey)
      list.value = result[stateKey] || []
    })
  }

  /**
   * @description 更新数据
   * @param store 对象仓库
   */
  const updateData = async (
    store: IDBPObjectStore<unknown, [string], string, IDBTransactionMode>
  ) => {
    await store.put?.({ [stateKey]: [...list.value] }, stateKey)
  }

  /**
   * @description 添加歌曲到播放列表
   * @param id 歌曲 id 或 歌曲 id 数组
   */
  const add = (id: number | number[]) => {
    useDB(async (store) => {
      const ids = Array.isArray(id) ? id : [id]
      list.value = Array.from(new Set([...ids, ...list.value]))
      await updateData(store)
    }, 'readwrite')
  }

  /**
   * @description 下一首播放
   * @param cid 当前播放歌曲 id
   * @param sid 下一首播放歌曲 id
   */
  const addNext = (cid: number, sid: number) => {
    useDB(async (store) => {
      const index = list.value.indexOf(cid)
      if (index === -1) return
      list.value.splice(index + 1, 0, sid)
      await updateData(store)
    }, 'readwrite')
  }

  /**
   * 从播放列表中移除指定歌曲
   * @param id 歌曲 id
   */
  const remove = (id: number) => {
    useDB(async (store) => {
      const index = list.value.indexOf(id)
      if (index === -1) return
      list.value.splice(index, 1)
      await updateData(store)
    }, 'readwrite')
  }

  /**
   * @description 清空播放列表
   */
  const clear = () => {
    useDB(async (store) => {
      list.value = []
      await updateData(store)
    }, 'readwrite')
  }

  /**
   * @description 以数组的形式返回播放列表
   * @returns
   */
  const getList = () => {
    return list.value
  }

  return {
    init,
    add,
    remove,
    clear,
    getList,
    addNext,
  }
})
