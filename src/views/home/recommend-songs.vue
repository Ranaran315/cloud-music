<template>
  <div :class="ucn.b()">
    <n-data-table
      remote
      :data="recommends"
      :columns="columns"
      :row-props="rowProps"
    >
    </n-data-table>
  </div>
</template>

<script setup lang="ts">
import { recommendApi } from '@/api'
import { useClassName } from '@/hooks'
import { h, onMounted, ref } from 'vue'
import { NDataTable, NImage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

const ucn = useClassName('recommend-songs', false)
defineOptions({
  name: 'RecommendSongs',
})

const recommends = ref<any>([])
const getRecommendSongs = async () => {
  try {
    const {
      data: { dailySongs },
    } = (await recommendApi.getRecommendSongs()) as any
    recommends.value = dailySongs
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getRecommendSongs()
})

const columns: DataTableColumns = [
  {
    title: '#',
    key: 'id',
    render: (_: any, index: number) => {
      return index + 1
    },
  },
  {
    title: '标题',
    key: 'name',
    render: (row: any) => {
      return h('span', { class: ucn.e('title') }, [
        h(NImage, {
          src: row.al.picUrl,
          class: ucn.e('pic'),
        }),
        h('div', [
          row.name,
          row.alia?.length > 0 ? `(${row.alia.join('/')})` : '',
        ]),
      ])
    },
  },
  {
    title: '歌手',
    key: 'ar',
    render: (row: any) => {
      return row.ar.map((item: any) => item.name).join('/')
    },
  },
]

const rowProps = (row: any) => {
  return {
    class: ucn.e('row'),
    onClick: () => {
      console.log(row)
    },
  }
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'recommend-songs',
  $use-namespace: false
);

@include b() {
  ::v-deep {
    @include e('row') {
      cursor: pointer;
    }
    @include e('title') {
      display: flex;
      align-items: center;
      height: 100%;
    }
    @include e('pic') {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 4px;
    }
  }
}
</style>
