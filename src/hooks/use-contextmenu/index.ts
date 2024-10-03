import { showContextMenu } from '@/components'
import { ContextMenuOptions } from '@/components'
import { Delete, Like, Play } from '@/icons'
import { usePlayerStore, useSongStore, useToPlaylistStore } from '@/store'
import { Song } from '@/utils/interface'

/**
 * @description 单曲的 contextmenu
 * @param e
 * @param data
 */
export const useSongContextMenu = (
  e: PointerEvent | MouseEvent,
  data: Song
) => {
  const playerStore = usePlayerStore()
  const songStore = useSongStore()
  return showContextMenu(e, [
    {
      icon: Play,
      text: '播放',
      onChoose: () => {
        playerStore.setCurrentSong(data.id)
      },
    },
    {
      icon: Play,
      text: '下一首播放',
      onChoose: () => {
        playerStore.addToNext(data.id)
      },
    },
    {
      icon: Like,
      text: '喜欢',
      onChoose: () => {
        songStore.like(data.id)
      },
    },
  ])
}

/**
 * @description 播放列表的 contextmenu
 * @param e
 */
export const useToPlaylistContextMenu = (
  e: PointerEvent | MouseEvent,
  data: Song,
  options: ContextMenuOptions
) => {
  const playerStore = usePlayerStore()
  const songStore = useSongStore()
  const toPlaylistStore = useToPlaylistStore()
  return showContextMenu(
    e,
    [
      {
        icon: Play,
        text: '播放',
        onChoose: () => {
          playerStore.setCurrentSong(data.id)
        },
      },
      {
        icon: Like,
        text: '喜欢',
        onChoose: () => {
          songStore.like(data.id)
        },
      },
      {
        icon: Delete,
        text: '删除',
        onChoose: () => {
          toPlaylistStore.remove(data.id)
        },
      },
    ],
    options
  )
}
