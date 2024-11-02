import {
  openDB,
  type IDBPObjectStore,
  type OpenDBCallbacks,
  type IDBPDatabase,
} from 'idb'

const dbName = 'music'
const dbVersion = 2
const DBStoreEnum = {
  TO_PLAYLIST: 'to-playlist',
  SEARCH_HISTORY: 'search-history',
}

export function useIndexDB(
  storeName: string,
  openDBCallbakcks?: OpenDBCallbacks<unknown>
) {
  // 设置默认值
  if (!openDBCallbakcks) {
    openDBCallbakcks = {
      upgrade(db, oldVersion) {
        switch (oldVersion) {
          case 0:
            updateVersionToV1(db)
          // fall through
          case 1:
            updateVersionToV2(db)
          // fall through
          default:
            console.warn('unknown indexdb version')
        }
      },
    }
  }

  // 打开数据库
  const dbPromise = openDB(dbName, dbVersion, openDBCallbakcks)

  /**
   * @description 使用数据库的公共方法
   * @param mode 事务模式
   * @returns
   */
  const useDB = async (
    callback: (
      store: IDBPObjectStore<unknown, [string], string, IDBTransactionMode>
    ) => Promise<void>,
    mode: IDBTransactionMode = 'readonly'
  ) => {
    const db = await dbPromise // 等待数据库打开
    const tx = db.transaction(storeName, mode) // 创建事务并获取对象仓库
    const store = tx.objectStore(storeName)
    await callback(store)
  }

  return useDB
}

/**
 * @description 更新数据库版本到 v1，添加播放列表对象仓库
 * @param db
 */
function updateVersionToV1(db: IDBPDatabase) {
  db.createObjectStore(DBStoreEnum.TO_PLAYLIST)
}

/**
 * @description 更新数据库版本到 v2，新增搜索记录对象仓库
 * @param db
 */
function updateVersionToV2(db: IDBPDatabase) {
  db.createObjectStore(DBStoreEnum.SEARCH_HISTORY)
}
