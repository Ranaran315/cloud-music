<template>
  <div ref="searchRef" :class="ucn.b()" @mouseover="handleMouseover">
    <ra-tooltip
      trigger="click"
      :trigger-el="searchRef"
      :show-arrow="false"
      transition="expand"
    >
      <template #default>
        <ra-input
          :placeholder="placeholder"
          v-model="modelValue"
          ref="RaInputRef"
          clearable
          @focus="handleFocus"
          @keydown.tab="handleKeydownTab"
          @input="handleChange"
        >
          <template #prefix>
            <ra-button shape="circle">
              <ra-icon> <Search /> </ra-icon>
            </ra-button>
          </template>
        </ra-input>
      </template>
      <template #content>
        <ul :class="ucn.e('search-list')">
          <template v-if="showHotlist">
            <div class="title">推荐热搜</div>
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
            <div class="title">猜你想搜</div>
            <li
              :class="ucn.e('search-item')"
              v-for="(item, index) of searchlist"
              :key="index"
            >
              <span class="word">{{ item.name }}</span>
            </li>
          </template>
        </ul>
      </template>
    </ra-tooltip>
  </div>
</template>

<script setup lang="ts">
import { RaButton, RaIcon, RaInput, RaTooltip } from '@capybara-plus/vue'
import { Search } from '@/icons'
import { useClassName } from '@/hooks'
import { computed, onMounted, ref, watch } from 'vue'
import searchApi from '@/api/search'

const ucn = useClassName('search')

defineOptions({
  name: 'cloud-search',
})

const modelValue = ref('')
const searchRef = ref(null)

const RaInputRef = ref<typeof RaInput | null>(null)
const handleMouseover = () => {
  RaInputRef.value?.focus()
}

// 获取默认搜索
const placeholder = ref('搜索歌曲、歌手、专辑')
async function getDefaultSearchKeywords() {
  const { data } = await searchApi.default()
  placeholder.value = data.showKeyword
}
// 挂载时获取默认搜索
onMounted(() => {
  getDefaultSearchKeywords()
})

// 在搜索框中按下 Tab 键将 placeholder 设置为当前搜索词
const handleKeydownTab = (e: KeyboardEvent) => {
  e.preventDefault()
  if (modelValue.value) return
  modelValue.value = placeholder.value
}

// 获取热搜列表
const hotlist = ref<any>([])
let throllte = 0 // 节流
const handleFocus = async () => {
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
  return !modelValue.value || searchlist.value.length === 0
})

// 值发生改变时获取搜索建议
const searchlist = ref<any>([])
let antiShake: any = null // 防抖
const handleChange = async () => {
  if (antiShake) clearTimeout(antiShake)
  antiShake = setTimeout(async () => {
    try {
      const res = (await searchApi.suggest(modelValue.value)) as any
      const { result } = res
      result?.order?.forEach((item: string) => {
        searchlist.value.push(...result[item])
      })
    } catch (error) {
      console.error(error)
    }
  }, 300)
}

watch(
  () => modelValue.value,
  (val: string) => {
    if (val.length === 0) {
      searchlist.value = []
    }
  }
)
</script>

<style scoped src="@/style/components/search.scss"></style>
