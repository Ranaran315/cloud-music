<template>
  <div :class="ucn.b()" ref="searchRef">
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
            v-model="modelValue"
            ref="RaInputRef"
            clearable
            @focus="handleFocus"
            @keydown.tab="handleKeydownTab"
            @keydown.enter="doSearch(modelValue)"
            @input="handleChange"
          >
            <template #prefix>
              <div class="search-icon">
                <ra-icon size="1.5rem">
                  <Search />
                </ra-icon>
              </div>
            </template>
          </ra-input>
        </div>
      </template>
      <div :class="ucn.e('popover')">
        <cloud-loading :show="loading">
          <div :class="ucn.e('search-list')">
            <template v-if="showHotlist">
              <div :class="ucn.e('title')">推荐热搜</div>
              <div
                :class="ucn.e('search-item')"
                v-for="(item, index) of hotlist"
                :key="index"
                @click="doSearch(item.searchWord)"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="word">{{ item.searchWord }}</span>
              </div>
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
                  @click="doSearch(item.name)"
                >
                  <div class="word">{{ item.name }}</div>
                </div>
              </div>
            </template>
          </div>
        </cloud-loading>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { RaIcon, RaInput } from '@capybara-plus/vue'
import { NPopover } from 'naive-ui'
import { Album, Artist, Playlist, Search, Song } from '@/icons'
import { useClassName } from '@/hooks'
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { searchApi } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const ucn = useClassName('navbar-search', false)

defineOptions({
  name: 'NavbarSearch',
})

const modelValue = ref('')

const RaInputRef = ref<typeof RaInput | null>(null)

// 是否展示 popover
const showPopover = ref(false)

const searchRef = ref(null)
onClickOutside(searchRef, () => {
  showPopover.value = false
})

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
    getSearchSuggest()
  })
}

const loading = ref(false) // 加载效果

// 获取热搜列表
const hotlist = ref<any[]>([])
let throllte = 0 // 节流
const handleFocus = async () => {
  showPopover.value = true
  if (!showHotlist.value) return
  try {
    loading.value = true
    if (parseInt(Date.now().toString()) - throllte < 1000 * 60 * 2) return
    const res = await searchApi.hotDetail()
    hotlist.value = res.data
    throllte = parseInt(Date.now().toString())
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
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
  getSearchSuggest()
}
// 根据关键字搜索
let searchShake: any = null // 防抖
const getSearchSuggest = async () => {
  if (searchShake) clearTimeout(searchShake)
  searchShake = setTimeout(async () => {
    try {
      loading.value = true
      const res = (await searchApi.suggest(modelValue.value)) as any
      const { result } = res
      searchlistOrder.value = result?.order
      searchlistOrder.value?.forEach?.((item: string) => {
        searchlist.value[item] = result[item]
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
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

const router = useRouter()
const route = useRoute()

// 点击搜索列表项时搜索
const doSearch = async (keywords: string) => {
  showPopover.value = false
  modelValue.value = keywords
  router.push({
    path: '/search',
    query: {
      keywords,
      type: route.query.type ?? 1018,
    },
  })
}
</script>

<style scoped lang="scss">
@use '@/style/bem' as * with (
  $block: 'navbar-search',
  $use-namespace: false
);

$width: 400px;
$size: 40px;

@include b() {
  display: flex;
  align-items: center;
  width: $width;

  @include e('trigger') {
    width: $width;
    position: relative;
    .search-icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      color: getFillColor();
      background-color: getColor('primary');
      box-sizing: border-box;
    }
  }

  .ra-input {
    width: $width;
    height: $size;
    border-radius: $size;
    padding: 0;
    padding-right: 10px;
    transition: width 0.3s, border-radius 0.3s;
    outline-color: getColor('primary');
    caret-color: getColor('primary');
    .ra-button {
      &:active:not(:disabled) {
        transform: scale(1);
      }
    }
  }
}

@include e('popover') {
  width: $width;
  background-color: getFillColor();
  border-radius: 3px;
  @include e('search-list') {
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    padding: 10px 0;
    margin: 0;
    overflow: auto;
    @include e('title') {
      width: 100%;
      text-align: left;
      padding: 5px 20px;
      font-weight: 700;
      font-size: 1.2rem;
      box-sizing: border-box;
    }
    @include e('subtitle') {
      width: 100%;
      text-align: left;
      padding: 5px 20px;
      box-sizing: border-box;
      font-weight: 700;
      color: getTextColor('third');
      background-color: getFillColor('third');
    }
    @include e('search-wrapper') {
    }
    @include e('search-item') {
      width: 100%;
      padding: 10px 20px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .index {
        margin-right: 15px;
        color: getTextColor('secondary');
      }
      &:hover {
        background-color: getFillColor('secondary');
        .word {
          color: getColor('primary');
        }
      }
      &:nth-child(-n + 4) {
        .index {
          color: getColor('primary');
        }
      }
    }
  }
}
</style>
