<template>
  <Transition name="expand">
    <div v-show="visible" :class="ucn.b()" :style="style">我是一个右键菜单</div>
  </Transition>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { computed, CSSProperties, onBeforeUnmount, onMounted, ref } from 'vue'

const ucn = useClassName('contextmenu', false)
defineOptions({
  name: 'ContextMenu',
})

const props = defineProps({
  x: Number,
  y: Number,
  onDestory: {
    type: Function,
    required: true,
  },
})

const visible = ref(false)
onMounted(() => {
  visible.value = true
})

const style = computed<CSSProperties>(() => {
  return {
    left: `${props.x}px`,
    top: `${props.y}px`,
  }
})

/**
 * @description 销毁组件的场景
 */
const destory = () => {
  visible.value = false
  props.onDestory()
}
// 按下 esc 键销毁
const escDestory = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    destory()
  }
}
const scroll = () => {
  destory()
}
window.addEventListener('keydown', escDestory)
window.addEventListener('scroll', scroll)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', escDestory)
  window.removeEventListener('scroll', scroll)
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'contextmenu',
  $use-namespace: false
);

@include b() {
  background-color: getFillColor();
  padding: 10px;
  border-radius: getBorderRadius('mini');
  position: fixed;
  width: 200px;
  height: 200px;
  box-shadow: getBoxShadow('secondary');
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s linear;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}
</style>
