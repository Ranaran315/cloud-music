const playlistIdKey = 'PLAYLIST_ID'
const usePlaylistStorage = () => {
  const getPlaylistId = () => {
    const id = localStorage.getItem(playlistIdKey)
    const parseId = parseInt(id || '')
    if (isNaN(parseId)) return null
    return parseId
  }

  const setPlaylistId = (id: string | number | null) => {
    if (!id) return
    localStorage.setItem(playlistIdKey, id.toString())
  }

  const removePlaylistId = () => {
    localStorage.removeItem(playlistIdKey)
  }

  return { getPlaylistId, setPlaylistId, removePlaylistId }
}

export default usePlaylistStorage
