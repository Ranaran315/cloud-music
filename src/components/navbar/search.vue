<template>
  <div ref="searchRef" :class="ucn.b()" @mouseover="handleMouseover">
    <n-popover
      trigger="manual"
      :show="showPopover"
      raw
      :scrollable="false"
      :show-arrow="false"
      placement="bottom"
      to="#app"
    >
      <template #trigger>
        <div :class="ucn.e('trigger')">
          <ra-input
            :placeholder="defaultKeyword.show"
            v-model.trim="modelValue"
            ref="RaInputRef"
            clearable
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.tab="handleKeydownTab"
            @input="handleChange"
          >
            <template #prefix>
              <cloud-button shape="circle" type="primary" size="medium">
                <ra-icon size="1.5rem"> <Search /> </ra-icon>
              </cloud-button>
            </template>
          </ra-input>
        </div>
      </template>
      <div :class="ucn.e('popover')">
        <div :class="ucn.e('search-list')">
          <template v-if="showHotlist">
            <div :class="ucn.e('title')">推荐热搜</div>
            <li
              :class="ucn.e('search-item')"
              v-for="(item, index) of hotlist"
              :key="index"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="word">{{ item.searchWord }}</span>
            </li>
          </template>
          <template v-else>
            <div :class="ucn.e('title')">猜你想搜</div>
            <div v-for="(order, index) of searchlistOrder" :key="index">
              <div :class="ucn.e('subtitle')">
                <ra-icon size="1.5em">
                  <component :is="searchlistMap[order].component"></component>
                </ra-icon>
                {{ searchlistMap[order].name }}
              </div>
              <div
                :class="ucn.e('search-item')"
                v-for="(item, index) of searchlist[order]"
                :key="index"
                @click="doSearch(item.id)"
              >
                <div class="word">{{ item.name }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { RaIcon, RaInput } from '@capybara-plus/vue'
import { CloudButton } from '../button'
import { NPopover } from 'naive-ui'
import { Album, Artist, Playlist, Search, Song } from '@/icons'
import { useClassName } from '@/hooks'
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { searchApi, songApi } from '@/api'

const ucn = useClassName('search')

defineOptions({
  name: 'CloudSearch',
})

const modelValue = ref('')
const searchRef = ref(null)

const RaInputRef = ref<typeof RaInput | null>(null)
const handleMouseover = () => {
  RaInputRef.value?.focus()
  nextTick(() => {
    showPopover.value = true
  })
}

// 是否展示 popover
const showPopover = ref(false)

// 失去焦点时关闭 popover
const handleBlur = () => {
  showPopover.value = false
}

// 获取默认搜索
const defaultKeyword = reactive({
  show: '搜索歌曲、歌手、专辑等',
  keyword: '',
})
async function getDefaultSearchKeywords() {
  const {
    data: { showKeyword, realkeyword },
  } = await searchApi.default()
  defaultKeyword.show = showKeyword
  defaultKeyword.keyword = realkeyword
}
// 挂载时获取默认搜索
onMounted(() => {
  getDefaultSearchKeywords()
})

// 在搜索框中按下 Tab 键将 默认搜索关键字 设置为当前搜索词
const handleKeydownTab = (e: KeyboardEvent) => {
  e.preventDefault()
  if (modelValue.value) return
  modelValue.value = defaultKeyword.keyword
  nextTick(() => {
    search()
  })
}

// 获取热搜列表
const hotlist = ref<any[]>([])
let throllte = 0 // 节流
const handleFocus = async () => {
  if (!showHotlist.value) return
  try {
    if (parseInt(Date.now().toString()) - throllte < 1000 * 60 * 2) return
    const res = await searchApi.hotDetail()
    hotlist.value = res.data
    throllte = parseInt(Date.now().toString())
  } catch (error) {
    console.error(error)
  }
}

// 计算是否展示热搜列表
const showHotlist = computed(() => {
  return !modelValue.value || JSON.stringify(searchlist.value) == '{}'
})

// 根据关键字获取搜索建议
const searchlist = ref<any>({})
const searchlistOrder = ref<string[]>([])
const searchlistMap: Record<string, any> = {
  albums: {
    name: '专辑',
    component: Album,
  },
  artists: {
    name: '歌手',
    component: Artist,
  },
  playlists: {
    name: '歌单',
    component: Playlist,
  },
  songs: {
    name: '歌曲',
    component: Song,
  },
}

// 当值发生改变时搜索
const handleChange = async () => {
  search()
}

// 根据关键字搜索
let searchShake: any = null // 防抖
const search = async () => {
  if (searchShake) clearTimeout(searchShake)
  searchShake = setTimeout(async () => {
    try {
      const res = (await searchApi.suggest(modelValue.value)) as any
      const { result } = res
      searchlistOrder.value = result?.order
      searchlistOrder.value?.forEach?.((item: string) => {
        searchlist.value[item] = result[item]
      })
      console.log(searchlist)
    } catch (error) {
      console.error(error)
    }
  }, 300)
}

// 当搜索框的值为空时，清空搜索列表
watch(
  () => modelValue.value,
  (val: string) => {
    if (val.length === 0) {
      searchlist.value = {}
      searchlistOrder.value = []
    }
  }
)

const doSearch = async (id: number) => {
  const res = await songApi.getSongUrl(id.toString())
  console.log('getSongUrl', res)
}
</script>

<style scoped src="@/style/components/navbar/search.scss"></style>
