<template>
  <div :class="ucn.b()">
    <cloud-loading :show="loading">
      <n-data-table
        remote
        :data="(data as any)"
        :columns="columns"
        :row-props="rowProps"
        :bordered="false"
      >
      </n-data-table>
    </cloud-loading>
  </div>
</template>

<script setup lang="ts">
import { useClassName, useSongContextMenu } from '@/hooks'
import { DataTableColumns, NDataTable } from 'naive-ui'
import { computed, h } from 'vue'
import { CloudImage } from '@/components'
import { Song } from '@/utils/type'
import { formatDuration } from '@/utils/format'
import { RaIcon } from '@capybara-plus/vue'
import { Like, Liked } from '@/icons'
import { usePlayerStore, useSongStore } from '@/store'
import { definePropType } from '@/utils/props'

const ucn = useClassName('songlist')
defineOptions({
  name: 'CloudSonglist',
})

defineProps({
  data: definePropType<Array<Song>>(Array),
  loading: Boolean,
})

const songStore = useSongStore()
const playerStore = usePlayerStore()

const likedlist = computed(() => songStore.likedlist)

// 列渲染
const columns: DataTableColumns<Song> = [
  {
    title: '#',
    key: 'id',
    render: (_: Song, index: number) => {
      return index + 1
    },
  },
  {
    title: '标题',
    key: 'name',
    render: (row: Song) => {
      return h('div', { class: ucn.e('title') }, [
        h(CloudImage, {
          src: row.al.picUrl,
          class: ucn.e('pic'),
        }),
        [
          h('div', { class: ucn.e('name') }, [
            row.name,
            h('div', { class: ucn.e('alias') }, [
              row.alia?.length > 0 ? `${row.alia.join(' / ')}` : '',
            ]),
          ]),
        ],
      ])
    },
  },
  {
    title: '歌手',
    key: 'ar',
    render: (row: Song) => {
      return h(
        'div',
        { class: ucn.e('artist') },
        row.ar.map((item: any) => item.name).join('/')
      )
    },
  },
  {
    title: '专辑',
    key: 'al',
    render: (row: Song) => {
      return h('div', { class: ucn.e('album') }, row.al.name)
    },
  },
  {
    title: '喜欢',
    key: 'like',
    render: (row: Song) => {
      return h(
        RaIcon,
        {
          class: ucn.e('like'),
          size: '1.2rem',
          onClick: () => songStore.like(row.id),
        },
        { default: () => h(likedlist.value.has(row.id) ? Liked : Like) }
      )
    },
  },
  {
    title: '时长',
    key: 'dt',
    render: (row: Song) => {
      return h('div', { class: ucn.e('duration') }, formatDuration(row.dt))
    },
  },
]

// 行属性
const rowProps = (row: Song) => {
  return {
    class: ucn.e('row'),
    onClick: () => {
      playerStore.setCurrentSong(row.id)
    },
    oncontextmenu: (e: PointerEvent) => {
      useSongContextMenu(e, row)
    },
  }
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'songlist'
);

::v-deep {
  .n-data-table-th,
  .n-data-table-td {
    background-color: transparent;
    color: inherit;
  }
  @include e('row') {
    background-color: getFillColor();
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: getFillColor('third') !important;
    }
    &:nth-child(even) {
      background-color: getFillColor('secondary');
    }
    @include e('title') {
      @include flex($align: center);
      height: 100%;
      @include e('pic') {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 4px;
      }
      @include e('name') {
        width: 200px;
        max-width: 200px;
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          @include e('alias') {
            animation: roll 10s linear infinite;
          }
        }
        @include e('alias') {
          width: fit-content;
          font-size: 0.7rem;
        }
      }
    }
    @include e('artist') {
      @include ellipsis();
      width: 200px;
    }
    @include e('album') {
      @include ellipsis();
      width: 200px;
    }
    @include e('duration') {
      white-space: nowrap;
    }
  }
}

@include b() {
}

@keyframes roll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-120%);
  }
}
</style>
