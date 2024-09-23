import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSongStore } from './song'
import { openDB } from 'idb'

const dbName = 'music'
const storeName = 'to-playlist'
const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, {
        autoIncrement: true,
      })
    }
  },
})

const key = 'TO_PLAYLIST'
export const useToPlaylistStore = defineStore(key, () => {
  // 播放列表
  const list = ref<Set<number>>(new Set())
  const songStore = useSongStore()

  // 初始化
  const init = async () => {
    const db = await dbPromise // 等待数据库打开
    const tx = db.transaction(storeName, 'readonly') // 创建只读事务
    const store = tx.objectStore(storeName) // 获取对象仓库
    const result = await store.getAll()
    list.value = new Set(result.map((item) => item.sid))
  }

  // 添加歌曲到播放列表
  const add = async (id: number | number[]) => {
    const db = await dbPromise // 等待数据库打开
    const tx = db.transaction(storeName, 'readwrite') // 创建读写事务
    const store = tx.objectStore(storeName) // 获取对象仓库
    const ids = Array.isArray(id) ? id : [id]
    for (const id of ids) {
      await store.put({ sid: id })
      list.value.add(id)
    }
  }

  // 从播放列表中移除歌曲
  const remove = async (id: number) => {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.delete(id)
    list.value.delete(id)
  }

  // 清空播放列表
  const clear = async () => {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.clear()
    list.value.clear()
  }

  const getList = () => {
    return Array.from(list.value)
  }

  // 下一首
  const next = () => {
    const ids = Array.from(list.value)
    if (ids.length <= 1) return
    let index: number = 0
    if (songStore.song.id) {
      index = ids.indexOf(songStore.song.id)
    }
    if (index >= ids.length - 1 || index === -1) {
      index = 0
    }
    return ids[++index]
  }

  // 下一首
  const prev = () => {
    const ids = Array.from(list.value)
    if (ids.length <= 1) return
    let index: number = ids.length - 1
    if (songStore.song.id) {
      index = ids.indexOf(songStore.song.id)
    }
    if (index <= 0 || index === -1) {
      index = ids.length - 1
    }
    return ids[--index]
  }

  return {
    init,
    add,
    remove,
    clear,
    getList,
    next,
    prev,
  }
})
