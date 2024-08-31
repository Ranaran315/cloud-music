<template>
  <div :class="ucn.b()">
    <div :class="ucn.e('logo')">
      <ra-icon>
        <LogoWithName />
      </ra-icon>
    </div>
    <div :class="ucn.e('menu')">
      <Search />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassName } from '@/hooks'
import { RaIcon } from '@capybara-plus/vue'
import { LogoWithName } from '@/icons'
import Search from './search.vue'

const ucn = useClassName('navbar')
defineOptions({
  name: 'CloudNavbar',
})
</script>

<style scoped src="@/style/components/navbar.scss"></style>
