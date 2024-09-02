const cacheKey = 'RECOMMEND_CACHE'
const useRecommendLocalStorage = () => {
  // 设置推荐歌单缓存时间
  function setRecommend(time: number, data: any) {
    localStorage.setItem(cacheKey, JSON.stringify({ cache: time, data }))
  }

  // 获取推荐歌单
  function getRecommendList() {
    const { data } = JSON.parse(localStorage.getItem(cacheKey) || '{}')
    return data || []
  }

  // 获取推荐歌单缓存时间
  function getRecommentCache(): string {
    const { cache } = JSON.parse(localStorage.getItem(cacheKey) || '{}')
    return cache || 0
  }

  return {
    setRecommend,
    getRecommendList,
    getRecommentCache,
  }
}

export default useRecommendLocalStorage
