<template>
  <div :class="ucn.b()" @mouseover="handleMouseover">
    <ra-input v-model="modelValue" ref="RaInputRef" clearable>
      <template #prefix>
        <ra-button shape="circle">
          <ra-icon> <Search /> </ra-icon>
        </ra-button>
      </template>
    </ra-input>
  </div>
</template>

<script setup lang="ts">
import { RaButton, RaIcon, RaInput } from '@capybara-plus/vue'
import { Search } from '@/icons'
import { useClassName } from '@/hooks'
import { ref } from 'vue'

const ucn = useClassName('search')

defineOptions({
  name: 'cloud-search',
})

const modelValue = defineModel({
  type: String,
})

const RaInputRef = ref<typeof RaInput | null>(null)
const handleMouseover = () => {
  RaInputRef.value?.focus()
}
</script>

<style scoped src="@/style/components/search.scss"></style>
