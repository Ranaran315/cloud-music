import { defineStore } from 'pinia'
import { ref } from 'vue'
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

  /**
   * @description 初始化
   */
  const init = async () => {
    const db = await dbPromise // 等待数据库打开
    const tx = db.transaction(storeName, 'readonly') // 创建只读事务
    const store = tx.objectStore(storeName) // 获取对象仓库
    const result = await store.getAll()
    list.value = new Set(result.map((item) => item.sid))
  }

  /**
   * @description 添加歌曲到播放列表
   * @param id 歌曲 id 或 歌曲 id 数组
   */
  const add = async (id: number | number[]) => {
    const db = await dbPromise // 等待数据库打开
    const tx = db.transaction(storeName, 'readwrite') // 创建读写事务
    const store = tx.objectStore(storeName) // 获取对象仓库
    const ids = Array.isArray(id) ? id.reverse() : [id] // id.reverse() 是因为拿出来的时候会进行反转
    for (const id of ids) {
      await store.put({ sid: id })
      list.value.add(id)
    }
  }

  /**
   * 从播放列表中移除指定歌曲
   * @param id 歌曲 id
   */
  const remove = async (id: number) => {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.delete(id)
    list.value.delete(id)
  }

  /**
   * @description 清空播放列表
   */
  const clear = async () => {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    await store.clear()
    list.value.clear()
  }

  /**
   * @description 以数组的形式返回播放列表
   * @returns
   */
  const getList = () => {
    return Array.from(list.value).reverse()
  }

  return {
    init,
    add,
    remove,
    clear,
    getList,
  }
})
