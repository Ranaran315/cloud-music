import { showContextMenu } from '@/components'
import { Like, Play } from '@/icons'
import { usePlayerStore, useSongStore } from '@/store'
import { Song } from '@/utils/type'

export const useSongContextMenu = (e: PointerEvent, data: Song) => {
  const playerStore = usePlayerStore()
  const songStore = useSongStore()
  showContextMenu(e, [
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
