// 搜索记录仓库
import { useIndexDB } from '@/hooks'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDB = useIndexDB('search-history')

const key = 'SEARCH_HISTORY'
const primaryKey = 'search-history'
export const useSearchHistoryStore = defineStore(key, () => {
  const list = ref<Array<string>>([]) // 搜索记录列表

  /**
   * @description 初始化
   */
  const init = () => {
    useDB(async (store) => {
      const result = await store.get(primaryKey)
      list.value = result[primaryKey] || []
    })
  }

  const add = (keyword: string) => {
    useDB(async (store) => {
      if (list.value.includes(keyword)) {
        const index = list.value.indexOf(keyword)
        list.value.splice(index, 1)
      }
      list.value.unshift(keyword)
      await store.put?.({ [primaryKey]: [...list.value] }, primaryKey)
    }, 'readwrite')
  }

  return {
    list,
    init,
    add,
  }
})
