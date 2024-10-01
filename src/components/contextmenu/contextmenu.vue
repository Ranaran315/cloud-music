<template>
  <Transition name="expand">
    <ul v-show="visible" :class="ucn.b()" :style="style">
      <li
        :class="ucn.e('item')"
        v-for="(item, index) of menu"
        :key="index"
        @click.stop="item.onChoose?.()"
      >
        <cloud-icon :icon="item.icon" />
        <span :class="ucn.e('text')">{{ item.text }}</span>
      </li>
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { definePropType } from '@/utils/props'
import { computed, CSSProperties, onBeforeUnmount, onMounted, ref } from 'vue'
import { ContextMenus } from './instance'
import { CloudIcon } from '../icon'

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
  menu: definePropType<Array<ContextMenus>>(Array),
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
// 页面滚动时销毁
const scrollDestory = () => {
  destory()
}
// 点击页面销毁
const clickDestory = () => {
  destory()
}
window.addEventListener('keydown', escDestory)
window.addEventListener('scroll', scrollDestory)
window.addEventListener('click', clickDestory, true)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', escDestory)
  window.removeEventListener('scroll', scrollDestory)
  window.removeEventListener('click', clickDestory, true)
})
</script>

<style lang="scss">
@use '@/style/bem' as * with (
  $block: 'contextmenu',
  $use-namespace: false
);

@include b() {
  background-color: getFillColor();
  padding: 10px 0;
  border-radius: getBorderRadius('mini');
  position: fixed;
  width: 200px;
  height: auto;
  box-shadow: getBoxShadow('secondary');
  z-index: getZIndex('contextmenu');
  cursor: pointer;
  @include e('item') {
    @include flex($align: center);
    padding: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: getFillColor('third');
    }
    @include e('text') {
      margin-left: 10px;
    }
  }
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
